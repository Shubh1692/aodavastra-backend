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
exports.WishListController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const wish_list_service_1 = require("./wish-list.service");
const swagger_1 = require("@nestjs/swagger");
const wish_list_interface_1 = require("./wish-list.interface");
let WishListController = class WishListController {
    constructor(wishListService) {
        this.wishListService = wishListService;
    }
    wishLists(req) {
        const user = req.user;
        return this.wishListService.findWishListByUserId(user._id);
    }
    addFollower(req, wishListDto) {
        const user = req.user;
        return this.wishListService.create(wishListDto, user._id);
    }
    removeFollower(req, wishListDto) {
        const user = req.user;
        return this.wishListService.remove(wishListDto, user._id);
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
], WishListController.prototype, "wishLists", null);
__decorate([
    (0, common_1.Post)(""),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, wish_list_interface_1.WishListDto]),
    __metadata("design:returntype", void 0)
], WishListController.prototype, "addFollower", null);
__decorate([
    (0, common_1.Delete)(""),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, wish_list_interface_1.WishListDto]),
    __metadata("design:returntype", void 0)
], WishListController.prototype, "removeFollower", null);
WishListController = __decorate([
    (0, swagger_1.ApiTags)("wish-list"),
    (0, common_1.Controller)("wish-list"),
    __metadata("design:paramtypes", [wish_list_service_1.WishListService])
], WishListController);
exports.WishListController = WishListController;
//# sourceMappingURL=wish-list.controller.js.map