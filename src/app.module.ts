import * as path from "path";
import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {MailerModule} from "@nest-modules/mailer";
import {ServeStaticMiddleware} from "@nest-middlewares/serve-static";
import {MorganModule} from "nest-morgan";

import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import {GlobalAccessLogger} from "./common/accessLogger";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import config from "./config";
import { AddressModule } from "./address/address.module";
import { FollowerModule } from "./follower/follower.module";
import { WishListModule } from "./wish-list/wish-list.module";
import { ProductModule } from "./product/product.module";
import { PostModule } from "./post/post.module";
import { PostLikeModule } from "./post-like/post-like.module";
import { CommentModule } from "./comment/comment.module";

import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path'; 

const DEV_TRANSPORTER = {

  
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ethereal.user@ethereal.email",
    pass: "verysecret",
  },
};

@Module({
  imports: [
    AuthModule,
    MorganModule,
    MongooseModule.forRoot(process.env.MONGO_URL!),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.MAILGUN_TRANSPORT || DEV_TRANSPORTER,
        defaults: {
          from: config.mail.from,
        },
      }),
    }),
    UserModule,
    AddressModule,
    FollowerModule,
    PostModule,
    WishListModule,
    ProductModule,
    PostLikeModule,
    CommentModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
  ],
  providers: config.isTest() ? undefined : [GlobalAccessLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    ServeStaticMiddleware.configure(
      path.resolve(__dirname, "..", "public"),
      config.static,
    );
    ServeStaticMiddleware.configure(
      path.resolve(__dirname, "..", "uploads"),
      config.static,
    );
    consumer.apply(ServeStaticMiddleware).forRoutes("public");

    if (!config.isTest()) {
      consumer.apply(LoggerMiddleware).forRoutes("api");
    }
  }
}
