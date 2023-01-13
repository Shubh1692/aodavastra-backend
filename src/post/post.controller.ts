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
import { PostService } from "./post.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { User } from "../user/user.interface";
import { PostDto, PaginationParams } from "./post.interface";
import { imageFileFilter, multerStorage } from "../common/multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ObjectId } from 'mongoose'
@ApiTags("post")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get("")
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth("JWT-auth")
  posts(@Req() req: Request,
    @Query() { page, itemsPerPage }: PaginationParams) {
    return this.postService.findPosts(page, itemsPerPage);
  }

  @Get(":id")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  post(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.postService.findById(id);
  }


  @Post("")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        description: { type: 'string' },
        tagPeople: {
          type: 'array', properties: {
            items: {
              type: 'string'
            }
          }
        },
        tagProduct: {
          type: 'array', properties: {
            items: {
              type: 'string'
            }
          }
        },
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
  addPost(@Req() req: Request, @UploadedFile("file") media: Express.Multer.File, @Body() postDto: PostDto) {
    const user = req.user as User;
    return this.postService.create(
      user._id,
      postDto as any, media);
  }


  @Put(":id")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        description: { type: 'string' },
        tagPeople: {
          type: 'array', properties: {
            items: {
              type: 'string'
            }
          }
        },
        tagProduct: {
          type: 'array', properties: {
            items: {
              type: 'string'
            }
          }
        },
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
  async updatePost(
    @UploadedFile("file") media: Express.Multer.File,
    @Req() req: Request,
    @Body() postDto: PostDto,
    @Param('id') id: string
  ) {
    const user = req.user as User;
    return this.postService.update(id, user._id, postDto as any, media);
  }
}
