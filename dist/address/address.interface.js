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
exports.AddressDto = exports.AddressLineDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class AddressLineDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Address 1" }),
    __metadata("design:type", String)
], AddressLineDto.prototype, "address1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Address 2" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressLineDto.prototype, "address2", void 0);
exports.AddressLineDto = AddressLineDto;
class AddressDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Jon" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddressDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddressDto.prototype, "isDefault", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "302039" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddressDto.prototype, "pinCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Jaipur" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Rajasthan" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            address1: "Address 1",
            address2: "Address 2",
        },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", AddressLineDto)
], AddressDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "phoneNo" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "phoneNo", void 0);
exports.AddressDto = AddressDto;
//# sourceMappingURL=address.interface.js.map