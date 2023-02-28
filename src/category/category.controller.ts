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
import { CategoryService } from "./category.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { User } from "../user/user.interface";
import { CategoryDto } from "./category.interface";
import { imageFileFilter, multerStorage } from "../common/multer";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get("")
  categories(@Req() req: Request, ) {
    const user = req.user as User;
    return this.categoryService.findCategory();
  }


  @Post("")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        description: { type: 'string' },
        name: { type: 'string' },
        parentCategoryId: { type: 'string' },
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
  addCategory(@Req() req: Request, @UploadedFile("file") media: Express.Multer.File, @Body() categoryDto: CategoryDto) {
    const user = req.user as User;
    return this.categoryService.create(
      user,
      categoryDto as any, media);
  }

  @Put(":id")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        description: { type: 'string' },
        name: { type: 'string' },
        parentCategoryId: { type: 'string' },
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
    @Body() categoryDto: CategoryDto,
    @Param('id') id: string
  ) {
    const user = req.user as User;
    return this.categoryService.update(id, user, categoryDto as any, media);
  }

  @Delete(":id")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  deleteAddress(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.categoryService.delete(id, user._id);
  }
}
