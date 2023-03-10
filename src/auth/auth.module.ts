import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";

import config from "../config";
import {UserModule} from "../user/user.module";
import PassportModule from "../common/passport.module";

import {AuthService} from "./auth.service";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";
import {AuthController} from "./auth.controller";
import setupSwagger from "./auth.swagger";
import { FileUploadService } from "../common/services/upload.service";
import { FollowerModule } from "../follower/follower.module";

@Module({
  imports: [
    PassportModule,
    UserModule,
    FollowerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: config.auth.jwtTokenExpireInSec},
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, FileUploadService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

setupSwagger(AuthModule);
