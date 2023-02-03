"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_swagger_1 = require("./post.swagger");
const post_model_1 = require("./post.model");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const passport_module_1 = require("../common/passport.module");
const user_module_1 = require("../user/user.module");
const config_1 = require("../config");
const jwt_1 = require("@nestjs/jwt");
const upload_service_1 = require("../common/services/upload.service");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_module_1.default,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: config_1.default.auth.jwtTokenExpireInSec },
            }),
            post_model_1.PostModel
        ],
        providers: [post_service_1.PostService, upload_service_1.FileUploadService],
        controllers: [post_controller_1.PostController],
        exports: [],
    })
], PostModule);
exports.PostModule = PostModule;
(0, post_swagger_1.default)(PostModule);
//# sourceMappingURL=post.module.js.map