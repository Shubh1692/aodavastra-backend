"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerModule = void 0;
const common_1 = require("@nestjs/common");
const follower_model_1 = require("./follower.model");
const user_module_1 = require("../user/user.module");
const passport_module_1 = require("../common/passport.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config");
const follower_service_1 = require("./follower.service");
const follower_controller_1 = require("./follower.controller");
const follower_swagger_1 = require("./follower.swagger");
let FollowerModule = class FollowerModule {
};
FollowerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_module_1.default,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: config_1.default.auth.jwtTokenExpireInSec },
            }),
            follower_model_1.FollowerModel,
        ],
        providers: [follower_service_1.FollowerService],
        controllers: [follower_controller_1.FollowerController],
        exports: [follower_service_1.FollowerService],
    })
], FollowerModule);
exports.FollowerModule = FollowerModule;
(0, follower_swagger_1.default)(FollowerModule);
//# sourceMappingURL=follower.module.js.map