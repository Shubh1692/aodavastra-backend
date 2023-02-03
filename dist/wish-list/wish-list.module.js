"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListModule = void 0;
const common_1 = require("@nestjs/common");
const wish_list_swagger_1 = require("./wish-list.swagger");
const wish_list_controller_1 = require("./wish-list.controller");
const wish_list_service_1 = require("./wish-list.service");
const user_module_1 = require("../user/user.module");
const passport_module_1 = require("../common/passport.module");
const wish_list_model_1 = require("./wish-list.model");
const config_1 = require("../config");
const jwt_1 = require("@nestjs/jwt");
let WishListModule = class WishListModule {
};
WishListModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_module_1.default,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: config_1.default.auth.jwtTokenExpireInSec },
            }),
            wish_list_model_1.WishListModel
        ],
        providers: [wish_list_service_1.WishListService],
        controllers: [wish_list_controller_1.WishListController],
        exports: [],
    })
], WishListModule);
exports.WishListModule = WishListModule;
(0, wish_list_swagger_1.default)(WishListModule);
//# sourceMappingURL=wish-list.module.js.map