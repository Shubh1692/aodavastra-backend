import {Module} from "@nestjs/common";
import {FollowerModel} from "./follower.model";
import {UserModule} from "../user/user.module";
import PassportModule from "../common/passport.module";
import {JwtModule} from "@nestjs/jwt";
import config from "../config";
import {FollowerService} from "./follower.service";
import {FollowerController} from "./follower.controller";
import setupSwagger from "./follower.swagger";
@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: config.auth.jwtTokenExpireInSec},
    }),
    FollowerModel,
  ],
  providers: [FollowerService],
  controllers: [FollowerController],
  exports: [],
})
export class FollowerModule {}

setupSwagger(FollowerModule);
