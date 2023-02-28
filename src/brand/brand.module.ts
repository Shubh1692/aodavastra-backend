import { Module } from "@nestjs/common";
import setupSwagger from "./brand.swagger";
import { BrandModel } from "./brand.model";
import { BrandController } from "./brand.controller";
import { BrandService } from "./brand.service";
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
    BrandModel],
  providers: [ BrandService, FileUploadService],
  controllers: [BrandController],
  exports: [],
})
export class BrandModule { }

setupSwagger(BrandModule);



