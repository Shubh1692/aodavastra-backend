import { Module } from "@nestjs/common";
import setupSwagger from "./category.swagger";
import { CategoryModel } from "./category.model";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
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
    CategoryModel],
  providers: [CategoryService, FileUploadService],
  controllers: [CategoryController],
  exports: [],
})
export class CategoryModule { }

setupSwagger(CategoryModule);



