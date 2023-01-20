import { Module } from "@nestjs/common";
import setupSwagger from "./wish-list.swagger";
import { WishListController } from "./wish-list.controller";
import { WishListService } from "./wish-list.service";
import { UserModule } from "../user/user.module";
import PassportModule from "../common/passport.module";
import { WishListModel } from "./wish-list.model";
import config from "../config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: config.auth.jwtTokenExpireInSec },
    }),
    WishListModel],
  providers: [WishListService],
  controllers: [WishListController],
  exports: [],
})
export class WishListModule { }


setupSwagger(WishListModule)


