import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

import {comparePassword} from "../common/auth";
import {UserService} from "../user/user.service";
import {User} from "../user/user.interface";
import {ErrorMessageException, LoginCredentialsException, UserNotFoundException} from "../common/exceptions";
import { ObjectId } from 'mongoose';
import {
  ActivateParams,
  ChangePasswordDto,
  ForgottenPasswordDto,
  ResetPasswordDto,
  SignUpDto,
  UserCreatorDto,
  UserUpdateDto,
} from "./auth.interface";
import {FileUploadService} from "../common/services/upload.service";
import config from "../config";
import { FollowerService } from "../follower/follower.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly fileUploadService: FileUploadService,
    private readonly followerService: FollowerService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!comparePassword(password, user.password)) {
      throw LoginCredentialsException();
    }
    return user;
  }

  async validateUserById(id: ObjectId, password: string): Promise<User> {
    const user = await this.userService.findById(id, true);
    if (!comparePassword(password, user.password)) {
      throw ErrorMessageException("Old Password does not match");
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

  async getTagPeople(alreadyTagPeople: string[], search?: string) {
    return this.userService.getTagPeople(alreadyTagPeople, search);
  }

  async login(user: User) {
    const follow = await this.followerService.findFlowingAndFollowerCountByUserId(user._id);
    return {
      token: this.jwtService.sign({}, {subject: `${user.id}`}),
      user: {
        ...user.getPublicData(),
        ...follow
      },
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
      user: {
        ...user.getPublicData(),
        following: 0,
        followers: 0,
      },
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
  
  async changePassword({ oldPassword, newPassword }: ChangePasswordDto, userId: ObjectId) {
    await this.validateUserById(userId, oldPassword)
    const user = await this.userService.changePassword(
      oldPassword,
      newPassword,
      userId
    );
    return {
      token: this.jwtService.sign({}, {subject: `${user.id}`}),
      user: user.getPublicData(),
    };
  }

  async update(userId: ObjectId, userDto: UserUpdateDto) {
    const user = await this.userService.update(
      userId,
      userDto
    );
    return user;
  }

  async becomeCreator(userId: ObjectId, userDto: UserCreatorDto) {
    const existUser = await this.userService.findById(userId);
    if (!existUser) {
      throw UserNotFoundException()
    }
    if (existUser.isCreator) {
      throw ErrorMessageException(`${userDto.name} is already ModaVastra Creator`)
    }
    const user = await this.userService.update(
      userId,
      {
        ...userDto,
        isCreator: true
      }
    );
    return user;
  }

  async updatePicture(
    userId: ObjectId,
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

  async getUserProfile(user: User) {
    const follow = await this.followerService.findFlowingAndFollowerCountByUserId(user._id);
    return {
      user: {
        ...user.getPublicData(),
        ...follow,
      },
      token: this.jwtService.sign({}, {subject: `${user.id}`}),
    }
  }

  async getUserProfileById(userId: ObjectId)  {
    const user = await this.userService.findById(userId)
    const follow = await this.followerService.findFlowingAndFollowerCountByUserId(userId);
    return {
      user: {
        ...user.getPublicData(),
        ...follow,
      }
    }
  }
}
