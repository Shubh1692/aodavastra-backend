import { Module } from "@nestjs/common";
import PassportModule from "../common/passport.module";
import {JwtModule} from "@nestjs/jwt";
import { CommentModel } from "./comment.model";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import setupSwagger from "./comment.swagger";
import { UserModule } from "../user/user.module";
import config from "../config";

@Module({
  imports: [

  PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: config.auth.jwtTokenExpireInSec},
    }),
    CommentModel],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [],
})
export class CommentModule { }

setupSwagger(CommentModule);
