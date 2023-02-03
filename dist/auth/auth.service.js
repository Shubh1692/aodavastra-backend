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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_1 = require("../common/auth");
const user_service_1 = require("../user/user.service");
const exceptions_1 = require("../common/exceptions");
const upload_service_1 = require("../common/services/upload.service");
const config_1 = require("../config");
const follower_service_1 = require("../follower/follower.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, fileUploadService, followerService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.fileUploadService = fileUploadService;
        this.followerService = followerService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!(0, auth_1.comparePassword)(password, user.password)) {
            throw (0, exceptions_1.LoginCredentialsException)();
        }
        return user;
    }
    async validateUserById(id, password) {
        const user = await this.userService.findById(id, true);
        if (!(0, auth_1.comparePassword)(password, user.password)) {
            throw (0, exceptions_1.ErrorMessageException)("Old Password does not match");
        }
        return user;
    }
    async activate({ userId, activationToken }) {
        const user = await this.userService.activate(userId, activationToken);
        return `
      Hi ${user.name},
      your account activate successfully
    `;
    }
    async getTagPeople(alreadyTagPeople, search) {
        return this.userService.getTagPeople(alreadyTagPeople, search);
    }
    async login(user) {
        const follow = await this.followerService.findFlowingAndFollowerCountByUserId(user._id);
        return {
            token: this.jwtService.sign({}, { subject: `${user.id}` }),
            user: Object.assign(Object.assign({}, user.getPublicData()), follow),
        };
    }
    async signUpUser(userData) {
        const user = await this.userService.create(userData.email, userData.password, userData);
        return {
            token: this.jwtService.sign({}, { subject: `${user.id}` }),
            user: Object.assign(Object.assign({}, user.getPublicData()), { following: 0, followers: 0 }),
        };
    }
    async forgottenPassword({ email }) {
        return await this.userService.forgottenPassword(email);
    }
    async resetPassword({ email, passwordResetToken, password }) {
        const user = await this.userService.resetPassword(email, passwordResetToken, password);
        return {
            token: this.jwtService.sign({}, { subject: `${user.id}` }),
            user: user.getPublicData(),
        };
    }
    async changePassword({ oldPassword, newPassword }, userId) {
        await this.validateUserById(userId, oldPassword);
        const user = await this.userService.changePassword(oldPassword, newPassword, userId);
        return {
            token: this.jwtService.sign({}, { subject: `${user.id}` }),
            user: user.getPublicData(),
        };
    }
    async update(userId, userDto) {
        const user = await this.userService.update(userId, userDto);
        return user;
    }
    async becomeCreator(userId, userDto) {
        const existUser = await this.userService.findById(userId);
        if (!existUser) {
            throw (0, exceptions_1.UserNotFoundException)();
        }
        if (existUser.isCreator) {
            throw (0, exceptions_1.ErrorMessageException)(`${userDto.name} is already ModaVastra Creator`);
        }
        const user = await this.userService.update(userId, Object.assign(Object.assign({}, userDto), { isCreator: true }));
        return user;
    }
    async updatePicture(userId, profilePicture, coverPicture) {
        let imageUrlObj = {
            profilePicture: undefined,
            coverPicture: undefined,
        };
        if (profilePicture && process.env.AWS_ACCESS_KEY_ID) {
            imageUrlObj.profilePicture = await this.fileUploadService.upload(profilePicture);
        }
        else if (profilePicture) {
            imageUrlObj.profilePicture = `${config_1.default.apiUrl}/uploads/${profilePicture.filename}`;
        }
        if (coverPicture && process.env.AWS_ACCESS_KEY_ID) {
            imageUrlObj.coverPicture = await this.fileUploadService.upload(coverPicture);
        }
        else if (coverPicture) {
            imageUrlObj.coverPicture = `${config_1.default.apiUrl}/uploads/${coverPicture.filename}`;
        }
        const user = await this.userService.update(userId, JSON.parse(JSON.stringify(imageUrlObj)));
        return user;
    }
    async getUserProfile(user) {
        const follow = await this.followerService.findFlowingAndFollowerCountByUserId(user._id);
        return {
            user: Object.assign(Object.assign({}, user.getPublicData()), follow),
            token: this.jwtService.sign({}, { subject: `${user.id}` }),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        upload_service_1.FileUploadService,
        follower_service_1.FollowerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map