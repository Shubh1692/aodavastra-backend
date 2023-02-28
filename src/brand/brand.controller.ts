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
import { BrandService } from "./brand.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { User } from "../user/user.interface";
import { BrandDto } from "./brand.interface";
import { imageFileFilter, multerStorage } from "../common/multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ObjectId } from 'mongoose'
@ApiTags("brand")
@Controller("brand")
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Get("")
  brands(@Req() req: Request, ) {
    const user = req.user as User;
    return this.brandService.findCategory();
  }


  @Post("")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        description: { type: 'string' },
        name: { type: 'string' },
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  @UseGuards(AuthGuard())
  @ApiConsumes("multipart/form-data")
  @ApiBearerAuth("JWT-auth")
  addBrand(@Req() req: Request, @UploadedFile("file") media: Express.Multer.File, @Body() brandDto: BrandDto) {
    const user = req.user as User;
    return this.brandService.create(
      user,
      brandDto as any, media);
  }

  @Put(":id")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        description: { type: 'string' },
        name: { type: 'string' },
        file: {
          type: "string",
          format: "binary",
        },
      },
    }
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  @UseGuards(AuthGuard())
  @ApiConsumes("multipart/form-data")
  @ApiBearerAuth("JWT-auth")
  async updateCategory(
    @UploadedFile("file") media: Express.Multer.File,
    @Req() req: Request,
    @Body() brandDto: BrandDto,
    @Param('id') id: string
  ) {
    const user = req.user as User;
    return this.brandService.update(id, user, brandDto as any, media);
  }

  @Delete(":id")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  deleteAddress(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.brandService.delete(id, user._id);
  }
}
