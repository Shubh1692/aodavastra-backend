import {Model, ObjectId} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {PostLike} from "./post-like.interface";
import {ErrorMessageException} from "../common/exceptions";
import {UserService} from "../user/user.service";

@Injectable()
export class PostLikeService {
  constructor(
    @InjectModel("PostLike") private readonly postLikeModel: Model<PostLike>,
    private readonly userService: UserService,
  ) {}

  async findPostLikeByUserId(userId: string): Promise<PostLike[]> {
    const postLikes = await this.postLikeModel
      .find({
        userId,
        isActive: true,
        postId: {
          $ne: null
        }
      }).populate({
        path: "postId", select: {
          _id: 1, description: true, media: true, type: true
        },
        match: {
          isActive: true
        }
      })
      
    return postLikes.filter(({  postId }) => postId);
  }

  async create(
    postLikeDto: Partial<PostLike>,
    userId: string,
  ): Promise<{
    postLike: boolean;
  }> {
    try {
      const hasPostLike = await this.postLikeModel.findOne({
        postId: postLikeDto.postId,
        userId
      });
      if (!hasPostLike) {
        const postLike = await this.postLikeModel.create({
          ...postLikeDto,
          userId,
          isActive: true,
        });
      }
      return {
        postLike: true,
      };
    } catch (error) {
      const message = error as {message: string};
      throw ErrorMessageException(
        message?.message || "User unable to create wishlist",
      );
    }
  }


  async remove(
    postLikeDto: Partial<PostLike>,
    userId: string,
  ): Promise<{
    postLike: boolean;
  }> {
    try {
      await this.postLikeModel.deleteOne({
        userId,
        postId: postLikeDto.postId,
      });
      return {
        postLike: false,
      };
    } catch (error) {
      const message = error as {message: string};
      throw ErrorMessageException(
        message?.message || "User unable to delete wishlist",
      );
    }
  }
}
