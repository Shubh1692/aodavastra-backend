import { Module } from "@nestjs/common";

import { AddressModel } from "./address.model";
import {UserModule} from "../user/user.module";
import PassportModule from "../common/passport.module";
import {JwtModule} from "@nestjs/jwt";
import config from "../config";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import setupSwagger from "./address.swagger";
@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: config.auth.jwtTokenExpireInSec},
    }),
    AddressModel],
  providers: [AddressService],
  controllers: [AddressController],
  exports: [],
})
export class AddressModule { }

setupSwagger(AddressModule);
