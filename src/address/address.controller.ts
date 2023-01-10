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
import {AddressService } from "./address.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {User} from "../user/user.interface";
import {AddressDto} from "./address.interface";

@ApiTags("address")
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  addresses(@Req() req: Request) {
    const user = req.user as User;
    return this.addressService.findByUserId(user._id);
  }

  @Get(":id")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  address(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.addressService.findById(id, user._id);
  }

  @Post("")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  addAddress(@Req() req: Request, @Body() addressDto: AddressDto) {
    const user = req.user as User;
    return this.addressService.create(addressDto, user._id);
  }

  @Put(":id")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  updateAddress(@Param('id') id: string, @Req() req: Request, @Body() addressDto: AddressDto) {
    const user = req.user as User;
    return this.addressService.update(id, addressDto, user._id);
  }

  @Delete(":id")
  @UseGuards(AuthGuard())
  @ApiBearerAuth("JWT-auth")
  deleteAddress(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.addressService.delete(id, user._id);
  }
}
