"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const config_1 = require("../config");
const auth_1 = require("../common/auth");
const exceptions_1 = require("../common/exceptions");
const user_mailer_service_1 = require("./user.mailer.service");
let UserService = class UserService {
    constructor(userModel, userMailer) {
        this.userModel = userModel;
        this.userMailer = userMailer;
    }
    async create(email, password, userData) {
        try {
            const user = await this.userModel.create(Object.assign(Object.assign({}, userData), { email: email.toLowerCase(), password: await (0, auth_1.hashPassword)(password), activationToken: (0, uuid_1.v4)(), activationExpires: Date.now() + config_1.default.auth.activationExpireInMs }));
            this.userMailer.sendActivationMail(user.email, user.id, user.activationToken);
            return user;
        }
        catch (error) {
            throw (0, exceptions_1.EmailAlreadyUsedException)();
        }
    }
    async findById(id, hashPassword = false) {
        const user = await this.userModel.findById(id, hashPassword ? "+password" : "");
        if (!user) {
            throw (0, exceptions_1.UserNotFoundException)();
        }
        return user;
    }
    async getTagPeople(alreadyTagPeople, search) {
        const findQuery = {
            isActive: true,
            isCreator: true
        };
        if (search) {
            findQuery.name = new RegExp(search, 'i');
        }
        if (alreadyTagPeople === null || alreadyTagPeople === void 0 ? void 0 : alreadyTagPeople.length) {
            findQuery._id = {
                $nin: alreadyTagPeople
            };
        }
        return this.userModel.find(findQuery, {
            _id: 1, name: 1, bio: 1,
            profilePicture: 1, coverPicture: 1,
        });
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email: email.toLowerCase() }, "+password");
        if (!user) {
            throw (0, exceptions_1.UserNotFoundException)();
        }
        return user;
    }
    async activate(userId, activationToken) {
        const user = await this.userModel
            .findOneAndUpdate({
            _id: userId,
            activationToken,
            isActive: false,
        }, {
            isActive: true,
            activationToken: undefined,
            activationExpires: undefined,
        }, {
            new: true,
            runValidators: true,
        })
            .where("activationExpires")
            .gt(Date.now())
            .exec();
        if (!user) {
            throw (0, exceptions_1.ActivationTokenInvalidException)();
        }
        return user;
    }
    async forgottenPassword(email) {
        const user = await this.userModel.findOneAndUpdate({
            email: email.toLowerCase(),
        }, {
            passwordResetToken: (0, uuid_1.v4)(),
            passwordResetExpires: Date.now() + config_1.default.auth.passwordResetExpireInMs,
        }, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            throw (0, exceptions_1.UserNotFoundException)();
        }
        this.userMailer.sendForgottenPasswordMail(user.email, user.passwordResetToken);
    }
    async resetPassword(email, passwordResetToken, password) {
        const user = await this.userModel
            .findOneAndUpdate({
            email: email.toLowerCase(),
            passwordResetToken,
        }, {
            password: await (0, auth_1.hashPassword)(password),
            passwordResetToken: undefined,
            passwordResetExpires: undefined,
        }, {
            new: true,
            runValidators: true,
        })
            .where("passwordResetExpires")
            .gt(Date.now())
            .exec();
        if (!user) {
            throw (0, exceptions_1.PasswordResetTokenInvalidException)();
        }
        this.userMailer.sendResetPasswordMail(user.email);
        return user;
    }
    async changePassword(oldPassword, newPassword, userId) {
        const user = await this.userModel
            .findByIdAndUpdate(userId, {
            password: await (0, auth_1.hashPassword)(newPassword),
            passwordResetToken: undefined,
            passwordResetExpires: undefined,
        }, {
            new: true,
            runValidators: true,
        })
            .exec();
        if (!user) {
            throw (0, exceptions_1.UserNotFoundException)();
        }
        this.userMailer.sendResetPasswordMail(user.email);
        return user;
    }
    async update(id, updateDto) {
        try {
            const oldUser = await this.userModel.findById(id);
            const user = await this.userModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, updateDto), ((oldUser === null || oldUser === void 0 ? void 0 : oldUser.email) !== (updateDto === null || updateDto === void 0 ? void 0 : updateDto.email)
                ? {
                    activationToken: (0, uuid_1.v4)(),
                    activationExpires: Date.now() + config_1.default.auth.activationExpireInMs,
                }
                : {})), {
                new: true,
                runValidators: true,
            });
            if (!user) {
                throw (0, exceptions_1.UserNotFoundException)();
            }
            if ((oldUser === null || oldUser === void 0 ? void 0 : oldUser.email) !== (updateDto === null || updateDto === void 0 ? void 0 : updateDto.email)) {
                this.userMailer.sendActivationMail(user.email, user.id, user.activationToken);
            }
            return user;
        }
        catch (error) {
            throw (0, exceptions_1.EmailAlreadyUsedException)();
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        user_mailer_service_1.UserMailerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map