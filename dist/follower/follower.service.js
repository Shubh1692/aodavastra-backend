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
exports.FollowerService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const exceptions_1 = require("../common/exceptions");
const user_service_1 = require("../user/user.service");
let FollowerService = class FollowerService {
    constructor(followerModel, userService) {
        this.followerModel = followerModel;
        this.userService = userService;
    }
    async findFollowingUsersByUserId(followerUserId) {
        const followers = await this.followerModel
            .find({
            followerUserId,
            isActive: true,
        })
            .populate({
            path: "followingUserId", select: {
                _id: 1, name: 1, bio: true
            },
            match: {}
        })
            .sort({
            createdAt: -1,
        });
        return followers.filter(({ followingUserId }) => followingUserId);
    }
    async findFollowerUsersByUserId(followingUserId) {
        const followers = await this.followerModel
            .find({
            followingUserId,
            isActive: true,
        })
            .populate({
            path: "followerUserId", select: {
                _id: 1, name: 1, bio: true
            },
            match: {}
        })
            .sort({
            createdAt: -1,
        });
        return followers.filter(({ followerUserId }) => followerUserId);
    }
    async findFlowingAndFollowerCountByUserId(userId) {
        const [following, followers] = await Promise.all([
            this.followerModel.count({
                followerUserId: userId,
                isActive: true,
            }),
            this.followerModel.count({
                followingUserId: userId,
                isActive: true,
            }),
        ]);
        return {
            following,
            followers,
        };
    }
    async create(followerDto, followerUserId) {
        var _a;
        try {
            if ((followerUserId === null || followerUserId === void 0 ? void 0 : followerUserId.toString()) === ((_a = followerDto === null || followerDto === void 0 ? void 0 : followerDto.followingUserId) === null || _a === void 0 ? void 0 : _a.toString())) {
                throw (0, exceptions_1.ErrorMessageException)("The user cannot follow themselves.");
            }
            const followingUser = await this.userService.findById(followerDto === null || followerDto === void 0 ? void 0 : followerDto.followingUserId);
            if (!(followingUser === null || followingUser === void 0 ? void 0 : followingUser.isCreator)) {
                throw (0, exceptions_1.ErrorMessageException)("User is not the creator you are following.");
            }
            const hasFollowed = await this.followerModel.findOne({
                followerUserId,
                followingUserId: followerDto.followingUserId,
            });
            if (!hasFollowed) {
                const follower = await this.followerModel.create(Object.assign(Object.assign({}, followerDto), { followerUserId, isActive: true }));
            }
            return {
                follow: true,
            };
        }
        catch (error) {
            const message = error;
            throw (0, exceptions_1.ErrorMessageException)((message === null || message === void 0 ? void 0 : message.message) || "User unable to follow user");
        }
    }
    async remove(followerDto, followerUserId) {
        var _a;
        try {
            if ((followerUserId === null || followerUserId === void 0 ? void 0 : followerUserId.toString()) === ((_a = followerDto === null || followerDto === void 0 ? void 0 : followerDto.followingUserId) === null || _a === void 0 ? void 0 : _a.toString())) {
                throw (0, exceptions_1.ErrorMessageException)("The user cannot unfollow themselves.");
            }
            const followingUser = await this.userService.findById(followerDto === null || followerDto === void 0 ? void 0 : followerDto.followingUserId);
            if (!(followingUser === null || followingUser === void 0 ? void 0 : followingUser.isCreator)) {
                throw (0, exceptions_1.ErrorMessageException)("User is not the creator you are unfollowing.");
            }
            await this.followerModel.deleteOne({
                followerUserId,
                followingUserId: followerDto.followingUserId,
            });
            return {
                follow: false,
            };
        }
        catch (error) {
            const message = error;
            throw (0, exceptions_1.ErrorMessageException)((message === null || message === void 0 ? void 0 : message.message) || "User unable to follow user");
        }
    }
};
FollowerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Follower")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        user_service_1.UserService])
], FollowerService);
exports.FollowerService = FollowerService;
//# sourceMappingURL=follower.service.js.map