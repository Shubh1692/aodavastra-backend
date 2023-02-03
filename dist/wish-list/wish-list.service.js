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
exports.WishListService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const exceptions_1 = require("../common/exceptions");
const user_service_1 = require("../user/user.service");
let WishListService = class WishListService {
    constructor(wishListModel, userService) {
        this.wishListModel = wishListModel;
        this.userService = userService;
    }
    async findWishListByUserId(userId) {
        const wishLists = await this.wishListModel
            .find({
            userId,
            isActive: true
        }).populate({
            path: "productId", select: {
                _id: 1, name: 1
            },
            match: {
                isActive: true
            }
        });
        return wishLists.filter(({ productId }) => productId);
        ;
    }
    async create(wishListDto, userId) {
        try {
            const hasWishList = await this.wishListModel.findOne({
                productId: wishListDto.productId,
                userId
            });
            if (!hasWishList) {
                const wishList = await this.wishListModel.create(Object.assign(Object.assign({}, wishListDto), { userId, isActive: true }));
            }
            return {
                wishList: true,
            };
        }
        catch (error) {
            const message = error;
            throw (0, exceptions_1.ErrorMessageException)((message === null || message === void 0 ? void 0 : message.message) || "User unable to create wishlist");
        }
    }
    async remove(wishListDto, userId) {
        try {
            await this.wishListModel.deleteOne({
                userId,
                productId: wishListDto.productId,
            });
            return {
                wishList: false,
            };
        }
        catch (error) {
            const message = error;
            throw (0, exceptions_1.ErrorMessageException)((message === null || message === void 0 ? void 0 : message.message) || "User unable to delete wishlist");
        }
    }
};
WishListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("WishList")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        user_service_1.UserService])
], WishListService);
exports.WishListService = WishListService;
//# sourceMappingURL=wish-list.service.js.map