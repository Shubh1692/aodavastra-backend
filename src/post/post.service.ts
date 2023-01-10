import { Model } from "mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Post } from "./post.interface";
import { ErrorMessageException } from "../common/exceptions";

@Injectable()
export class PostService {
  constructor(
    @InjectModel("Post") private readonly postModel: Model<Post>,
  ) { }

  async findPosts(): Promise<Post[]> {
    const posts = await this.postModel.aggregate([{
      $match: {
         isActive: true
      }
    },
    {
      $lookup:
        {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments"
        }
   }])

    return posts

  }

  async findById(_id: string): Promise<Post> {
    const post = await this.postModel.findOne({
      _id,
      isActive: true
    });
    console.log('========', post)

    if (!post) {
      throw ErrorMessageException("User unable to fetch post");
    }
    return post;
  }


}