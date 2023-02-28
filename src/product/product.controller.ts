import {
  Controller,
  Get,
  Post,
  Req,
  Put,
  UseGuards,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { User } from "../user/user.interface";
import { ProductDto } from "./product.interface";
import { imageFileFilter, multerStorage } from "../common/multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ObjectId } from 'mongoose'
@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) { }

}
