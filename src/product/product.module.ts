import { Module } from "@nestjs/common";
// import setupSwagger from "./product.swagger";
import { ProductModel } from "./product.model";
// import { ProductController } from "./product.controller";
// import { ProductService } from "./product.service";
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
    ProductModel],
  providers: [ FileUploadService],
  controllers: [],
  exports: [],
})
export class ProductModule { }

