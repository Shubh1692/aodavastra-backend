import {Model, ObjectId} from "mongoose";
import {ConflictException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Product} from "./product.interface";
import {ErrorMessageException} from "../common/exceptions";
import {FileUploadService} from "../common/services/upload.service";
import config from "../config";
import {constant, uniq} from "lodash";

@Injectable()
  export class ProductService {
    constructor(
      @InjectModel("Product") private readonly productModel: Model<Product>,
    ) { }

  
    }