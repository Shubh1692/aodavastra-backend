import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

import {comparePassword} from "../common/auth";
import {UserService} from "../user/user.service";
import {User} from "../user/user.interface";
import {LoginCredentialsException} from "../common/exceptions";

import {
  ActivateParams,
  ForgottenPasswordDto,
  ResetPasswordDto,
  SignUpDto,
  UserUpdateDto,
} from "./auth.interface";
import {FileUploadService} from "../common/services/upload.service";
import config from "../config";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!comparePassword(password, user.password)) {
      throw LoginCredentialsException();
    }
    return user;
  }

  async activate({userId, activationToken}: ActivateParams) {
    const user = await this.userService.activate(userId, activationToken);
    return `
      Hi ${user.name},
      your account activate successfully
    `;
  }

  async login(user: User) {
    return {
      token: this.jwtService.sign({}, {subject: `${user.id}`}),
      user: user.getPublicData(),
    };
  }

  async signUpUser(userData: SignUpDto) {
    const user = await this.userService.create(
      userData.email,
      userData.password,
      userData,
    );

    return {
      token: this.jwtService.sign({}, {subject: `${user.id}`}),
      user: user.getPublicData(),
    };
  }

  async forgottenPassword({email}: ForgottenPasswordDto) {
    return await this.userService.forgottenPassword(email);
  }

  async resetPassword({email, passwordResetToken, password}: ResetPasswordDto) {
    const user = await this.userService.resetPassword(
      email,
      passwordResetToken,
      password,
    );

    return {
      token: this.jwtService.sign({}, {subject: `${user.id}`}),
      user: user.getPublicData(),
    };
  }

  async update(userId: string, userDto: UserUpdateDto) {
    const user = await this.userService.update(
      userId,
      userDto
    );
    return user;
  }

  async updatePicture(
    userId: string,
    profilePicture: Express.Multer.File | null,
    coverPicture: Express.Multer.File | null,
  ) {
    let imageUrlObj: {
      profilePicture: string | undefined;
      coverPicture: string | undefined;
    } = {
      profilePicture: undefined,
      coverPicture: undefined,
    };
    if (profilePicture && process.env.AWS_ACCESS_KEY_ID) {
      imageUrlObj.profilePicture = await this.fileUploadService.upload(
        profilePicture,
      );
    } else if (profilePicture) {
      imageUrlObj.profilePicture = `${config.apiUrl}/uploads/${profilePicture.filename}`;
    }
    if (coverPicture && process.env.AWS_ACCESS_KEY_ID) {
      imageUrlObj.coverPicture = await this.fileUploadService.upload(
        coverPicture,
      );
    } else if (coverPicture) {
      imageUrlObj.coverPicture = `${config.apiUrl}/uploads/${coverPicture.filename}`;
    }

    const user = await this.userService.update(userId, JSON.parse(JSON.stringify(imageUrlObj)));
    return user;
  }
}
