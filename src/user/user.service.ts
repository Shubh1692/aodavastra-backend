import {Model,ObjectId} from "mongoose";
import {v4 as uuid} from "uuid";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import config from "../config";
import {hashPassword} from "../common/auth";
import {
  UserNotFoundException,
  EmailAlreadyUsedException,
  PasswordResetTokenInvalidException,
  ActivationTokenInvalidException,
} from "../common/exceptions";

import {User} from "./user.interface";
import {UserMailerService} from "./user.mailer.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>,
    private readonly userMailer: UserMailerService,
  ) {}
  /**
   * Creates user and sends activation email.
   * @throws duplicate key error when
   */
  async create(
    email: string,
    password: string,
    userData: Partial<User>,
  ): Promise<User> {
    try {
      const user = await this.userModel.create({
        ...userData,
        email: email.toLowerCase(),
        password: await hashPassword(password),
        activationToken: uuid(),
        activationExpires: Date.now() + config.auth.activationExpireInMs,
      });

      this.userMailer.sendActivationMail(
        user.email,
        user.id,
        user.activationToken,
      );

      return user;
    } catch (error) {
      throw EmailAlreadyUsedException();
    }
  }

  async findById(id: ObjectId, hashPassword: boolean = false): Promise<User> {
    const user = await this.userModel.findById(id, hashPassword ? "+password" : "");

    if (!user) {
      throw UserNotFoundException();
    }

    return user;
  }

  async getTagPeople(alreadyTagPeople: string[], search?: string): Promise<User[]> {
    const findQuery: {
      isActive: boolean;
      isCreator: boolean;
      name?: RegExp;
      _id?: {
        [key: string]: string[]
      }
    } = {
      isActive: true,
      isCreator: true
    }
    if (search) {
      findQuery.name = new RegExp(search, 'i')
    }
    if (alreadyTagPeople?.length) {
      findQuery._id = {
        $nin: alreadyTagPeople
      }
    }
    return this.userModel.find(findQuery, {
      _id: 1, name: 1, bio: 1,
      profilePicture: 1, coverPicture: 1,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne(
      {email: email.toLowerCase()},
      "+password",
    );

    if (!user) {
      throw UserNotFoundException();
    }

    return user;
  }

  async activate(userId: string, activationToken: string) {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          _id: userId,
          activationToken,
          isActive: false,
        },
        {
          isActive: true,
          activationToken: undefined,
          activationExpires: undefined,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .where("activationExpires")
      .gt(Date.now())
      .exec();

    if (!user) {
      throw ActivationTokenInvalidException();
    }
    return user;
  }

  async forgottenPassword(email: string) {
    const user = await this.userModel.findOneAndUpdate(
      {
        email: email.toLowerCase(),
      },
      {
        passwordResetToken: uuid(),
        passwordResetExpires: Date.now() + config.auth.passwordResetExpireInMs,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      throw UserNotFoundException();
    }

    this.userMailer.sendForgottenPasswordMail(
      user.email,
      user.passwordResetToken,
    );
  }

  async resetPassword(
    email: string,
    passwordResetToken: string,
    password: string,
  ) {
    const user = await this.userModel
      .findOneAndUpdate(
        {
          email: email.toLowerCase(),
          passwordResetToken,
        },
        {
          password: await hashPassword(password),
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .where("passwordResetExpires")
      .gt(Date.now())
      .exec();

    if (!user) {
      throw PasswordResetTokenInvalidException();
    }

    this.userMailer.sendResetPasswordMail(user.email);

    return user;
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    userId: ObjectId
  ) {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          password: await hashPassword(newPassword),
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    if (!user) {
      throw UserNotFoundException();
    }
    this.userMailer.sendResetPasswordMail(user.email);
    return user;
  }

  async update(id: ObjectId, updateDto: Partial<User>): Promise<User> {
    try {
      const oldUser = await this.userModel.findById(id);
      const user = await this.userModel.findByIdAndUpdate(
        id,
        {
          ...updateDto,
          ...(oldUser?.email !== updateDto?.email
            ? {
                activationToken: uuid(),
                activationExpires:
                  Date.now() + config.auth.activationExpireInMs,
              }
            : {}),
        },
        {
          new: true,
          runValidators: true,
        },
      );
      if (!user) {
        throw UserNotFoundException();
      }
      if (oldUser?.email !== updateDto?.email) {
        this.userMailer.sendActivationMail(
          user.email,
          user.id,
          user.activationToken,
        );
      }
      return user;
    } catch (error) {
      throw EmailAlreadyUsedException();
    }
  }
}
