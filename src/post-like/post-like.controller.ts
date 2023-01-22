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
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";
import {PostLikeService} from "./post-like.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {User} from "../user/user.interface";
import {PostLikeDto} from "./post-like.interface";

@ApiTags("post-like")
@Controller("post-like")
export class PostLikeController {
  constructor(private readonly wishListService: PostLikeService) {}

  @Get("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  wishLists(@Req() req: Request) {
    const user = req.user as User;
    return this.wishListService.findPostLikeByUserId(user._id);
  }

  @Post("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  addFollower(@Req() req: Request, @Body() wishListDto: PostLikeDto) {
    const user = req.user as User;
    return this.wishListService.create(wishListDto, user._id);
  }

  @Delete("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  removeFollower(@Req() req: Request, @Body() wishListDto: PostLikeDto) {
    const user = req.user as User;
    return this.wishListService.remove(wishListDto, user._id);
  }
}


