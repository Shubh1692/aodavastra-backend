"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config");
const user_module_1 = require("../user/user.module");
const passport_module_1 = require("../common/passport.module");
const auth_service_1 = require("./auth.service");
const local_strategy_1 = require("./local.strategy");
const jwt_strategy_1 = require("./jwt.strategy");
const auth_controller_1 = require("./auth.controller");
const auth_swagger_1 = require("./auth.swagger");
const upload_service_1 = require("../common/services/upload.service");
const follower_module_1 = require("../follower/follower.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_module_1.default,
            user_module_1.UserModule,
            follower_module_1.FollowerModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: config_1.default.auth.jwtTokenExpireInSec },
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, upload_service_1.FileUploadService],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
(0, auth_swagger_1.default)(AuthModule);
//# sourceMappingURL=auth.module.js.map