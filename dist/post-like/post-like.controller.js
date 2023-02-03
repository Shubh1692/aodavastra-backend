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
exports.PostLikeController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const post_like_service_1 = require("./post-like.service");
const swagger_1 = require("@nestjs/swagger");
const post_like_interface_1 = require("./post-like.interface");
let PostLikeController = class PostLikeController {
    constructor(wishListService) {
        this.wishListService = wishListService;
    }
    wishLists(req) {
        const user = req.user;
        return this.wishListService.findPostLikeByUserId(user._id);
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
], PostLikeController.prototype, "wishLists", null);
__decorate([
    (0, common_1.Post)(""),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_like_interface_1.PostLikeDto]),
    __metadata("design:returntype", void 0)
], PostLikeController.prototype, "addFollower", null);
__decorate([
    (0, common_1.Delete)(""),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_like_interface_1.PostLikeDto]),
    __metadata("design:returntype", void 0)
], PostLikeController.prototype, "removeFollower", null);
PostLikeController = __decorate([
    (0, swagger_1.ApiTags)("post-like"),
    (0, common_1.Controller)("post-like"),
    __metadata("design:paramtypes", [post_like_service_1.PostLikeService])
], PostLikeController);
exports.PostLikeController = PostLikeController;
//# sourceMappingURL=post-like.controller.js.map