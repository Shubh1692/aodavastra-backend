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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_interface_1 = require("./auth.interface");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("../common/multer");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    activate(params, userId) {
        return this.authService.activate(params);
    }
    getCreatorUsers(tagPeopleQuery) {
        return this.authService.getTagPeople(tagPeopleQuery === null || tagPeopleQuery === void 0 ? void 0 : tagPeopleQuery.alreadyTagPeople, tagPeopleQuery.search);
    }
    login(req, loginDto) {
        return this.authService.login(req.user);
    }
    async signup(signUpDto) {
        return this.authService.signUpUser(signUpDto);
    }
    getProfile(req) {
        const user = req.user;
        return this.authService.getUserProfile(user);
    }
    relogin(req) {
        return this.authService.login(req.user);
    }
    forgottenPassword(body) {
        return this.authService.forgottenPassword(body);
    }
    resetPassword(body) {
        return this.authService.resetPassword(body);
    }
    update(body, req) {
        const user = req.user;
        return this.authService.update(user._id, body);
    }
    becomeCreator(body, req) {
        const user = req.user;
        return this.authService.becomeCreator(user._id, body);
    }
    changePassword(body, req) {
        const user = req.user;
        return this.authService.changePassword(body, user._id);
    }
    async updateProfilePicture(file, req) {
        return this.authService.updatePicture(req.user._id, file, null);
    }
    async updateCoverPicture(file, req) {
        return this.authService.updatePicture(req.user._id, null, file);
    }
};
__decorate([
    (0, common_1.Get)("activate/:userId/:activationToken"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_interface_1.ActivateParams, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "activate", null);
__decorate([
    (0, common_1.Post)("tag-people"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_interface_1.TagPeopleQuery]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCreatorUsers", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local")),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_interface_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_interface_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)("me"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)("relogin"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "relogin", null);
__decorate([
    (0, common_1.Post)("forgotten-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_interface_1.ForgottenPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgottenPassword", null);
__decorate([
    (0, common_1.Post)("reset-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_interface_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)(""),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_interface_1.UserUpdateDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("become-creator"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_interface_1.UserCreatorDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "becomeCreator", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Put)("change-password"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_interface_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Put)("profile-picture"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: multer_1.multerStorage,
        fileFilter: multer_1.imageFileFilter,
    })),
    (0, common_1.Put)("profile-picture"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: multer_1.multerStorage,
        fileFilter: multer_1.imageFileFilter,
    })),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.UploadedFile)("file")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfilePicture", null);
__decorate([
    (0, common_1.Put)("cover-picture"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: multer_1.multerStorage,
        fileFilter: multer_1.imageFileFilter,
    })),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.UploadedFile)("file")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateCoverPicture", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map