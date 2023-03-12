import { Model, ObjectId } from "mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "./post.interface";
import { ErrorMessageException } from "../common/exceptions";
import { FileUploadService } from "../common/services/upload.service";
import config from "../config";
import { constant, uniq } from "lodash";

@Injectable()
export class PostService {
  searchForPosts(
    search: string,
    offset: number | undefined,
    limit: number | undefined,
  ) {
    throw new Error("Method not implemented.");
  }
  getAllPosts(offset: number | undefined, limit: number | undefined) {
    throw new Error("Method not implemented.");
  }
  constructor(
    @InjectModel("Post") private readonly postModel: Model<Post>,
    private readonly fileUploadService: FileUploadService,
  ) { }

  async findPosts(
    page: number,
    itemsPerPage: number,
  ): Promise<{
    total: number;
    data: Post[];
    page: number;
    itemsPerPage: number;
  }> {
    const offset = (page - 1) * itemsPerPage;

    const posts = await this.postModel
      .aggregate([
        {
          $match: {
            isActive: true,
          },
        },
        { $skip: offset },
        { $limit: itemsPerPage },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "postId",
            pipeline: [{ $match: { isActive: true } }],
            as: "comments",
          },
        },
        {
          $lookup: {
            from: "postlikes",
            localField: "_id",
            foreignField: "postId",
            pipeline: [{ $match: { isActive: true } }, {
              $project: {
                _id: 1,
                userId: 1,
                updatedAt: 1
              }
            }],
            as: "likes"
          }
        },
      ])
      .sort({ updatedAt: -1 });
    const postsWithPopulatedData = await this.postModel.populate(posts, [
      {
        path: "tagPeople",
        select: { name: 1, bio: 1, _id: 1, profilePicture: 1 },
        match: { isCreator: true },
      },
      { path: "tagProduct", select: { name: 1, _id: 1 }, match: { isActive: true } },
    ]);
    const total = await this.postModel.count({
      isActive: true,
    });
    return {
      itemsPerPage,
      total,
      data: postsWithPopulatedData,
      page,
    };
  }

  async findById(_id: string): Promise<Post> {
    const post = await this.postModel.findOne({
      _id,
      isActive: true,
    });

    if (!post) {
      throw ErrorMessageException("User unable to fetch post");
    }
    return post;
  }

  async create(
    userId: string,
    postDto: Partial<Post & { tagPeople: string; tagProduct: string }>,
    media: Express.Multer.File,
  ): Promise<Post> {
    let tagPeople: string[] = [],
      tagProduct: string[] = [];
    if (postDto.tagPeople) {
      tagPeople = uniq(postDto.tagPeople?.split(",") || []);
    }
    if (postDto.tagProduct) {
      tagProduct = uniq(postDto.tagProduct?.split(",") || []);
    }
    if (!tagProduct.length) {
      throw ErrorMessageException("Post required at least one prodct");
    }
    const imageUrlObj: { media?: string; type?: string } = {};
    if (media && process.env.AWS_ACCESS_KEY_ID) {
      imageUrlObj.media = await this.fileUploadService.upload(media);
    } else if (media) {
      imageUrlObj.media = `${config.apiUrl}/uploads/${media.filename}`;
      imageUrlObj.type = media.mimetype.includes("video") ? "video" : "image";
    }
    const post = await this.postModel.create({
      ...postDto,
      ...imageUrlObj,
      tagPeople,
      tagProduct,
      userId,
    });
    return post;
  }

  async update(
    _id: string,
    userId: string,
    postDto: Partial<Post & { tagPeople: string; tagProduct: string }>,
    media: Express.Multer.File,
  ): Promise<Post> {
    let tagPeople: string[] = [],
      tagProduct: string[] = [];
    if (postDto.tagPeople) {
      tagPeople = uniq(postDto.tagPeople?.split(",") || []);
    }
    if (postDto.tagProduct) {
      tagProduct = uniq(postDto.tagProduct?.split(",") || []);
    }
    if (!tagProduct.length) {
      throw ErrorMessageException("Post required at least one prodct");
    }
    const imageUrlObj: { media?: string; type?: string } = {};
    if (media && process.env.AWS_ACCESS_KEY_ID) {
      imageUrlObj.media = await this.fileUploadService.upload(media);
    } else if (media) {
      imageUrlObj.media = `${config.apiUrl}/uploads/${media.filename}`;
      imageUrlObj.type = media.mimetype.includes("video") ? "video" : "image";
    }
    const post = await this.postModel.findOneAndUpdate(
      {
        _id,
        isActive: true,
        userId,
      },
      {
        ...postDto,
        ...imageUrlObj,
        tagPeople,
        tagProduct,
      },
    );

    if (!post) {
      throw ErrorMessageException("User unable to fetch post");
    }
    return post;
  }
}
