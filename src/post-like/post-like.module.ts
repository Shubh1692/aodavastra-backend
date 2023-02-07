import { Module } from "@nestjs/common";
import setupSwagger from "./post-like.swagger";
import { PostLikeModel } from "./post-like.model";
import { PostLikeController } from "./post-like.controller";
import { PostLikeService } from "./post-like.service";
import PassportModule from "../common/passport.module";
import { UserModule } from "../user/user.module";
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
    PostLikeModel],
  providers: [PostLikeService],
  controllers: [PostLikeController],
  exports: [],
})
export class PostLikeModule { }

setupSwagger(PostLikeModule)
