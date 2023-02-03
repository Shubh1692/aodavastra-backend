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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const address_service_1 = require("./address.service");
const swagger_1 = require("@nestjs/swagger");
const address_interface_1 = require("./address.interface");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    addresses(req) {
        const user = req.user;
        return this.addressService.findByUserId(user._id);
    }
    address(id, req) {
        const user = req.user;
        return this.addressService.findById(id, user._id);
    }
    addAddress(req, addressDto) {
        const user = req.user;
        return this.addressService.create(addressDto, user._id);
    }
    updateAddress(id, req, addressDto) {
        const user = req.user;
        return this.addressService.update(id, addressDto, user._id);
    }
    deleteAddress(id, req) {
        const user = req.user;
        return this.addressService.delete(id, user._id);
    }
};
__decorate([
    (0, common_1.Get)(""),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "addresses", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "address", null);
__decorate([
    (0, common_1.Post)(""),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, address_interface_1.AddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "addAddress", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, address_interface_1.AddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "deleteAddress", null);
AddressController = __decorate([
    (0, swagger_1.ApiTags)("address"),
    (0, common_1.Controller)("address"),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map