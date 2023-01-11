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

import {FollowerService} from "./follower.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {User} from "../user/user.interface";
import {FollowerDto} from "./follower.interface";

@ApiTags("follow")
@Controller("follow")
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Get("followers")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  followers(@Req() req: Request) {
    const user = req.user as User;
    return this.followerService.findFollowerUsersByUserId(user._id);
  }

  @Get("following")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  following(@Req() req: Request) {
    const user = req.user as User;
    return this.followerService.findFollowingUsersByUserId(user._id);
  }


  @Post("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  addRemoveFollower(@Req() req: Request, @Body() followerDto: FollowerDto) {
    const user = req.user as User;
    return this.followerService.create(followerDto, user._id);
  }
}
