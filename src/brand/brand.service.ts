import {Model, ObjectId} from "mongoose";
import {ConflictException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Brand} from "./brand.interface";
import {ErrorMessageException} from "../common/exceptions";
import {FileUploadService} from "../common/services/upload.service";
import config from "../config";
import {constant, uniq} from "lodash";
import { User } from "src/user/user.interface";


@Injectable()
  export class BrandService {
    constructor(
      @InjectModel("Brand") private readonly brandModel: Model<Brand>,
      private readonly fileUploadService: FileUploadService,
    ) { }


    async findCategory(): Promise<Brand[]> {
      const brands = await this.brandModel.aggregate([
        {
          $match: {
          parentCategoryId: null
        }
      }
      ])
      if (!brands) {
        throw ErrorMessageException("User unable to fetch address");
      }
      return brands;
    }

    async create(
      user: User,
      brandDto: Partial<Brand>,
      media: Express.Multer.File,
    ): Promise<Brand> {
      if (!user.isAdmin) {
        throw ErrorMessageException("Unable to create brand");
      }
      const imageUrlObj: {image?: string} = {};
      if (media && process.env.AWS_ACCESS_KEY_ID) {
        imageUrlObj.image = await this.fileUploadService.upload(media);
      } else if (media) {
        imageUrlObj.image = `${config.apiUrl}/uploads/${media.filename}`;
      }
      const category = await this.brandModel.create({
        ...brandDto,
        ...imageUrlObj,
        userId: user._id,
      });
      return category;
    }
    
    async update(
      _id: string,
      user: User,
      brandDto: Partial<Brand>,
      media: Express.Multer.File,
    ): Promise<Brand> {
      if (!user.isAdmin) {
        throw ErrorMessageException("Unable to create brand");
      }
      const imageUrlObj: {image?: string} = {};
      if (media && process.env.AWS_ACCESS_KEY_ID) {
        imageUrlObj.image = await this.fileUploadService.upload(media);
      } else if (media) {
        imageUrlObj.image = `${config.apiUrl}/uploads/${media.filename}`;
      }
      const brand = await this.brandModel.findOneAndUpdate(
        {
          _id,
        },
        {
          ...brandDto,
          ...imageUrlObj,
          userId: user._id,
        },
      );
  
      if (!brand) {
        throw ErrorMessageException("User unable to fetch category");
      }
      return brand;
    }

    async delete(id: string, userId: string): Promise<Brand> {
    
    
      const brand = await this.brandModel.findOneAndUpdate({
        _id: id, userId
      }, {
        isActive: false,
        userId,
      }, {
        new: true
      });
      if (!brand) {
        throw ErrorMessageException("User unable to delete category");
      }
      return brand;
    }

    }