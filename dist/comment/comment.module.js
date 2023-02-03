"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const passport_module_1 = require("../common/passport.module");
const jwt_1 = require("@nestjs/jwt");
const comment_model_1 = require("./comment.model");
const comment_service_1 = require("./comment.service");
const comment_controller_1 = require("./comment.controller");
const comment_swagger_1 = require("./comment.swagger");
const user_module_1 = require("../user/user.module");
const config_1 = require("../config");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_module_1.default,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: config_1.default.auth.jwtTokenExpireInSec },
            }),
            comment_model_1.CommentModel
        ],
        providers: [comment_service_1.CommentService],
        controllers: [comment_controller_1.CommentController],
        exports: [],
    })
], CommentModule);
exports.CommentModule = CommentModule;
(0, comment_swagger_1.default)(CommentModule);
//# sourceMappingURL=comment.module.js.map