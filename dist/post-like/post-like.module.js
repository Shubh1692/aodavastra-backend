"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikeModule = void 0;
const common_1 = require("@nestjs/common");
const post_like_swagger_1 = require("./post-like.swagger");
const post_like_model_1 = require("./post-like.model");
const post_like_controller_1 = require("./post-like.controller");
const post_like_service_1 = require("./post-like.service");
const passport_module_1 = require("../common/passport.module");
const user_module_1 = require("../user/user.module");
const config_1 = require("../config");
const jwt_1 = require("@nestjs/jwt");
let PostLikeModule = class PostLikeModule {
};
PostLikeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_module_1.default,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: config_1.default.auth.jwtTokenExpireInSec },
            }),
            post_like_model_1.PostLikeModel
        ],
        providers: [post_like_service_1.PostLikeService],
        controllers: [post_like_controller_1.PostLikeController],
        exports: [],
    })
], PostLikeModule);
exports.PostLikeModule = PostLikeModule;
(0, post_like_swagger_1.default)(PostLikeModule);
//# sourceMappingURL=post-like.module.js.map