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
exports.FollowerController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const follower_service_1 = require("./follower.service");
const swagger_1 = require("@nestjs/swagger");
const follower_interface_1 = require("./follower.interface");
let FollowerController = class FollowerController {
    constructor(followerService) {
        this.followerService = followerService;
    }
    followers(req) {
        const user = req.user;
        return this.followerService.findFollowerUsersByUserId(user._id);
    }
    following(req) {
        const user = req.user;
        return this.followerService.findFollowingUsersByUserId(user._id);
    }
    addFollower(req, followerDto) {
        const user = req.user;
        return this.followerService.create(followerDto, user._id);
    }
    removeFollower(req, followerDto) {
        const user = req.user;
        return this.followerService.remove(followerDto, user._id);
    }
};
__decorate([
    (0, common_1.Get)("followers"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FollowerController.prototype, "followers", null);
__decorate([
    (0, common_1.Get)("following"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FollowerController.prototype, "following", null);
__decorate([
    (0, common_1.Post)(""),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, follower_interface_1.FollowerDto]),
    __metadata("design:returntype", void 0)
], FollowerController.prototype, "addFollower", null);
__decorate([
    (0, common_1.Delete)(""),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, follower_interface_1.FollowerDto]),
    __metadata("design:returntype", void 0)
], FollowerController.prototype, "removeFollower", null);
FollowerController = __decorate([
    (0, swagger_1.ApiTags)("follow"),
    (0, common_1.Controller)("follow"),
    __metadata("design:paramtypes", [follower_service_1.FollowerService])
], FollowerController);
exports.FollowerController = FollowerController;
//# sourceMappingURL=follower.controller.js.map