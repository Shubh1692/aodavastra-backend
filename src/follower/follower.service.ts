import {Model, ObjectId} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {Follower} from "./follower.interface";
import {ErrorMessageException} from "../common/exceptions";
import {UserService} from "../user/user.service";

@Injectable()
export class FollowerService {
  constructor(
    @InjectModel("Follower") private readonly followerModel: Model<Follower>,
    private readonly userService: UserService,
  ) {}

  async findFollowingUsersByUserId(followerUserId: string): Promise<Follower[]> {
    const followers = await this.followerModel
      .find({
        followerUserId,
        isActive: true,
      })
      .populate({
        path: "followingUserId", select: {
          _id: 1, name: 1, bio: true
        },
        match: {
         
        }
      })
      .sort({
        createdAt: -1,
      });
    return followers.filter(({  followingUserId }) => followingUserId);
  }

  async findFollowerUsersByUserId(followingUserId: string): Promise<Follower[]> {
    const followers = await this.followerModel
      .find({
        followingUserId,
        isActive: true,
      })
      .populate({
        path: "followerUserId", select: {
          _id: 1, name: 1, bio: true
        },
        match: {
        }
      })
      .sort({
        createdAt: -1,
      });
    return followers.filter(({  followerUserId }) => followerUserId);
  }


  async findFlowingAndFollowerCountByUserId(userId: ObjectId): Promise<{
    following: number;
    followers: number;
  }> {
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

  async create(
    followerDto: Partial<Follower>,
    followerUserId: string,
  ): Promise<{
    follow: boolean;
  }> {
    try {
      if (
        followerUserId?.toString() === followerDto?.followingUserId?.toString()
      ) {
        throw ErrorMessageException("The user cannot follow themselves.");
      }
      const followingUser = await this.userService.findById(
        followerDto?.followingUserId as ObjectId,
      );
      if (!followingUser?.isCreator) {
        throw ErrorMessageException(
          "User is not the creator you are following.",
        );
      }
      const hasFollowed = await this.followerModel.findOne({
        followerUserId,
        followingUserId: followerDto.followingUserId,
      });
      if (!hasFollowed) {
        const follower = await this.followerModel.create({
          ...followerDto,
          followerUserId,
          isActive: true,
        });
      }
      return {
        follow: true,
      };
    } catch (error) {
      const message = error as {message: string};
      throw ErrorMessageException(
        message?.message || "User unable to follow user",
      );
    }
  }


  async remove(
    followerDto: Partial<Follower>,
    followerUserId: string,
  ): Promise<{
    follow: boolean;
  }> {
    try {
      if (
        followerUserId?.toString() === followerDto?.followingUserId?.toString()
      ) {
        throw ErrorMessageException("The user cannot unfollow themselves.");
      }
      const followingUser = await this.userService.findById(
        followerDto?.followingUserId as ObjectId,
      );
      if (!followingUser?.isCreator) {
        throw ErrorMessageException(
          "User is not the creator you are unfollowing.",
        );
      }
      await this.followerModel.deleteOne({
        followerUserId,
        followingUserId: followerDto.followingUserId,
      });
      return {
        follow: false,
      };
    } catch (error) {
      const message = error as {message: string};
      throw ErrorMessageException(
        message?.message || "User unable to follow user",
      );
    }
  }
}
