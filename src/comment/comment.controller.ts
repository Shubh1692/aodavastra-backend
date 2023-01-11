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

import {CommentService } from "./comment.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {User} from "../user/user.interface";
import {CommentDto} from "./comment.interface";

@ApiTags("comment")
@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  

  @Post("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  addAddress(@Req() req: Request, @Body() commentDto: CommentDto) {
    const user = req.user as User;
    return this.commentService.create(commentDto, user._id);
  }

  @Get(":id")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  getCommentId(@Req() req: Request, @Param('id') id: string) {
    return this.commentService.findById(id);
  }

  @Delete(":id")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  deleteAddress(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.commentService.delete(id, user._id);

}

}
