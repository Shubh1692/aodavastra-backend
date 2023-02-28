import {Model, ObjectId} from "mongoose";
import {ConflictException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Category} from "./category.interface";
import {ErrorMessageException} from "../common/exceptions";
import {FileUploadService} from "../common/services/upload.service";
import config from "../config";
import {constant, uniq} from "lodash";
import { User } from "src/user/user.interface";

@Injectable()
  export class CategoryService {
    constructor(
      @InjectModel("Category") private readonly categoryModel: Model<Category>,
      private readonly fileUploadService: FileUploadService,
    ) {}
    
    async findCategory(): Promise<Category[]> {
      const categories = await this.categoryModel.aggregate([
        {
          $match: {
            parentCategoryId: null
          }
        },
        {
          "$graphLookup": {
            "from": "categories",
            "startWith": "$_id",
            "connectFromField": "_id",
            "connectToField": "parentCategoryId",
            "as": "children",
          }
        }
      ])
      if (!categories) {
        throw ErrorMessageException("User unable to fetch address");
      }
      return categories;
    }
 
    async create(
      user: User,
      categoryDto: Partial<Category>,
      media: Express.Multer.File,
    ): Promise<Category> {
      if (!user.isAdmin) {
        throw ErrorMessageException("Unable to create category");
      }
      const imageUrlObj: {image?: string} = {};
      if (media && process.env.AWS_ACCESS_KEY_ID) {
        imageUrlObj.image = await this.fileUploadService.upload(media);
      } else if (media) {
        imageUrlObj.image = `${config.apiUrl}/uploads/${media.filename}`;
      }
      const category = await this.categoryModel.create({
        ...categoryDto,
        ...imageUrlObj,
        userId: user._id,
      });
      return category;
    }

   
    async update(
      _id: string,
      user: User,
      categoryDto: Partial<Category>,
      media: Express.Multer.File,
    ): Promise<Category> {
      const categoryDtoUpdated = {...categoryDto};
      if (!user.isAdmin) {
        throw ErrorMessageException("Unable to create category");
      }
      const imageUrlObj: {image?: string} = {};
      if (media && process.env.AWS_ACCESS_KEY_ID) {
        imageUrlObj.image = await this.fileUploadService.upload(media);
      } else if (media) {
        imageUrlObj.image = `${config.apiUrl}/uploads/${media.filename}`;
      }
      if (!categoryDto.parentCategoryId) {
        delete categoryDtoUpdated.parentCategoryId
      }
      const category = await this.categoryModel.findOneAndUpdate(
        {
          _id,
        },
        {
          ...categoryDtoUpdated,
          ...imageUrlObj,
          userId: user._id,
        },
      );
  
      if (!category) {
        throw ErrorMessageException("User unable to fetch category");
      }
      return category;
    }

    async delete(id: string, userId: string): Promise<Category> {
    
    
      const category = await this.categoryModel.findOneAndUpdate({
        _id: id, userId
      }, {
        isActive: false,
        userId,
      }, {
        new: true
      });
      if (!category) {
        throw ErrorMessageException("User unable to delete category");
      }
      return category;
    }
  
    }