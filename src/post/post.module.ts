import { Module } from "@nestjs/common";
import setupSwagger from "./post.swagger";
import { PostModel } from "./post.model";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import PassportModule from "../common/passport.module";
import { UserModule } from "../user/user.module";
import config from "../config";
import { JwtModule } from "@nestjs/jwt";
import { FileUploadService } from "../common/services/upload.service";

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: config.auth.jwtTokenExpireInSec },
    }),
    PostModel],
  providers: [PostService, FileUploadService],
  controllers: [PostController],
  exports: [],
})
export class PostModule { }


setupSwagger(PostModule)
