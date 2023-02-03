"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const common_1 = require("@nestjs/common");
const address_model_1 = require("./address.model");
const user_module_1 = require("../user/user.module");
const passport_module_1 = require("../common/passport.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config");
const address_service_1 = require("./address.service");
const address_controller_1 = require("./address.controller");
const address_swagger_1 = require("./address.swagger");
let AddressModule = class AddressModule {
};
AddressModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_module_1.default,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: config_1.default.auth.jwtTokenExpireInSec },
            }),
            address_model_1.AddressModel
        ],
        providers: [address_service_1.AddressService],
        controllers: [address_controller_1.AddressController],
        exports: [],
    })
], AddressModule);
exports.AddressModule = AddressModule;
(0, address_swagger_1.default)(AddressModule);
//# sourceMappingURL=address.module.js.map