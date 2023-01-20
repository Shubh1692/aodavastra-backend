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

import {WishListService} from "./wish-list.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {User} from "../user/user.interface";
import {WishListDto} from "./wish-list.interface";

@ApiTags("wishList")
@Controller("wishList")
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @Get("wishList")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  wishLists(@Req() req: Request) {
    const user = req.user as User;
    return this.wishListService.findwishListByUserId(user._id);
  }

  @Post("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  addFollower(@Req() req: Request, @Body() wishListDto: WishListDto) {
    const user = req.user as User;
    return this.wishListService.create(wishListDto, user._id);
  }

  @Delete("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  removeFollower(@Req() req: Request, @Body() wishListDto: WishListDto) {
    const user = req.user as User;
    return this.wishListService.remove(wishListDto, user._id);
  }
}


