import {
  Controller,
  Get,
  Post,
  Req,
  Put,
  UseGuards,
  Body,
  Param,
  Delete
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";
import {PostService } from "./post.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {User} from "../user/user.interface";


@ApiTags("post")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get("")
  // @UseGuards(AuthGuard())
  // @ApiBearerAuth("JWT-auth")
  posts(@Req() req: Request) {
    const user = req.user as User;
    return this.postService.findPosts();
  }
  // router.get('/', function(req, res) {
  //   Post.find({})
  //     .populate('commentsIds')
  //     .exec(function(err, posts, count){  
  //       res.render( 'index', {
  //         user: req.user,
  //         page : 'index',
  //         title : '??????',
  //         posts : posts
  //       });
  //   });
  // });
  @Get(":id")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  post(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.postService.findById(id);
  }

}