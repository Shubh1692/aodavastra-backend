import { Model } from "mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Post } from "./post.interface";
import { ErrorMessageException } from "../common/exceptions";
import { FileUploadService } from "../common/services/upload.service";
import config from "../config";
import { uniq } from "lodash"

@Injectable()
export class PostService {
  constructor(
    @InjectModel("Post") private readonly postModel: Model<Post>,
    private readonly fileUploadService: FileUploadService,
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
    },
    {
      $lookup:
      {
        from: "users",
        localField: "_id",
        foreignField: "tagPeople",
        as: "tagPeopess"
      }
    }]).sort({updatedAt:-1});

    return posts

  }

  async findById(_id: string): Promise<Post> {
    const post = await this.postModel.findOne({
      _id,
      isActive: true
    });


    if (!post) {
      throw ErrorMessageException("User unable to fetch post");
    }
    return post;
  }



  async create(userId: string, postDto: Partial<Post & { tagPeople: string, tagProduct: string }>, media: Express.Multer.File): Promise<Post> {
    let tagPeople: string[] = [], tagProduct: string[] = [];
    if (postDto.tagPeople) {
      tagPeople = uniq(postDto.tagPeople?.split(",") || []);
    }
    if (postDto.tagProduct) {
      tagProduct = uniq(postDto.tagProduct?.split(",") || []);
    }
    if (!tagProduct.length) {
      throw ErrorMessageException("Post required at least one prodct")
    }
    const imageUrlObj: { media?: string,type?:string } = {}
    if (media && process.env.AWS_ACCESS_KEY_ID) {
      imageUrlObj.media = await this.fileUploadService.upload(
        media,
      );
    } else if (media) {
      imageUrlObj.media = `${config.apiUrl}/uploads/${media.filename}`;
      imageUrlObj.type = media.mimetype.includes('video') ? 'video' : 'image'
     }
    const post = await this.postModel.create({
      ...postDto,
      ...imageUrlObj,
      tagPeople,
      tagProduct,
      userId
    });
    return post;
  }
}


