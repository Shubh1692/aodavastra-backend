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
exports.AddressService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const exceptions_1 = require("../common/exceptions");
let AddressService = class AddressService {
    constructor(addressModel) {
        this.addressModel = addressModel;
    }
    async findByUserId(userId) {
        const addresses = await this.addressModel.find({
            userId,
            isActive: true
        }).sort({
            isDefault: -1
        });
        return addresses;
    }
    async findById(_id, userId) {
        const address = await this.addressModel.findOne({
            _id,
            userId,
            isActive: true
        });
        if (!address) {
            throw (0, exceptions_1.ErrorMessageException)("User unable to fetch address");
        }
        return address;
    }
    async create(addressDto, userId) {
        const oldDefaultAddress = await this.addressModel.findOne({
            userId, isActive: true, isDeault: true
        });
        if (addressDto.isDefault) {
            if (oldDefaultAddress) {
                oldDefaultAddress.set({
                    isDefault: false
                });
                await oldDefaultAddress.save();
            }
        }
        const address = await this.addressModel.create(Object.assign(Object.assign({}, addressDto), { userId, isDefault: !oldDefaultAddress ? true : addressDto.isDefault }));
        return address;
    }
    async update(id, addressDto, userId) {
        const oldDefaultAddress = await this.addressModel.findOne({
            userId, isActive: true, isDeault: true
        });
        if (addressDto.isDefault) {
            if ((oldDefaultAddress === null || oldDefaultAddress === void 0 ? void 0 : oldDefaultAddress._id) !== id) {
                oldDefaultAddress === null || oldDefaultAddress === void 0 ? void 0 : oldDefaultAddress.set({
                    isDefault: false
                });
                await (oldDefaultAddress === null || oldDefaultAddress === void 0 ? void 0 : oldDefaultAddress.save());
            }
        }
        else {
            if ((oldDefaultAddress === null || oldDefaultAddress === void 0 ? void 0 : oldDefaultAddress._id) === id) {
                throw (0, exceptions_1.ErrorMessageException)("User unable to update address");
            }
        }
        const address = await this.addressModel.findOneAndUpdate({
            id, userId, isActive: true,
        }, Object.assign(Object.assign({}, addressDto), { userId }), {
            new: true
        });
        if (!address) {
            throw (0, exceptions_1.ErrorMessageException)("User unable to update address");
        }
        return address;
    }
    async delete(id, userId) {
        const oldDefaultAddress = await this.addressModel.findOne({
            userId, isActive: true, isDeault: true
        });
        if ((oldDefaultAddress === null || oldDefaultAddress === void 0 ? void 0 : oldDefaultAddress._id) === id) {
            throw (0, exceptions_1.ErrorMessageException)("User unable to delete address");
        }
        const address = await this.addressModel.findOneAndUpdate({
            id, userId
        }, {
            isActive: false,
            userId,
        }, {
            new: true
        });
        if (!address) {
            throw (0, exceptions_1.ErrorMessageException)("User unable to delete address");
        }
        return address;
    }
};
AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Address")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map