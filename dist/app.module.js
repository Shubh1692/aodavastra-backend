"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path = require("path");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mailer_1 = require("@nest-modules/mailer");
const serve_static_1 = require("@nest-middlewares/serve-static");
const nest_morgan_1 = require("nest-morgan");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const accessLogger_1 = require("./common/accessLogger");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const config_1 = require("./config");
const address_module_1 = require("./address/address.module");
const follower_module_1 = require("./follower/follower.module");
const wish_list_module_1 = require("./wish-list/wish-list.module");
const product_module_1 = require("./product/product.module");
const post_module_1 = require("./post/post.module");
const post_like_module_1 = require("./post-like/post-like.module");
const comment_module_1 = require("./comment/comment.module");
const serve_static_2 = require("@nestjs/serve-static");
const path_1 = require("path");
const DEV_TRANSPORTER = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "ethereal.user@ethereal.email",
        pass: "verysecret",
    },
};
let AppModule = class AppModule {
    configure(consumer) {
        serve_static_1.ServeStaticMiddleware.configure(path.resolve(__dirname, "..", "public"), config_1.default.static);
        serve_static_1.ServeStaticMiddleware.configure(path.resolve(__dirname, "..", "uploads"), config_1.default.static);
        consumer.apply(serve_static_1.ServeStaticMiddleware).forRoutes("public");
        if (!config_1.default.isTest()) {
            consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes("api");
        }
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            nest_morgan_1.MorganModule,
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URL),
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: process.env.MAILGUN_TRANSPORT || DEV_TRANSPORTER,
                    defaults: {
                        from: config_1.default.mail.from,
                    },
                }),
            }),
            user_module_1.UserModule,
            address_module_1.AddressModule,
            follower_module_1.FollowerModule,
            post_module_1.PostModule,
            wish_list_module_1.WishListModule,
            product_module_1.ProductModule,
            post_like_module_1.PostLikeModule,
            comment_module_1.CommentModule,
            serve_static_2.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads'
            }),
            serve_static_2.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'build'),
                serveRoot: '/'
            }),
        ],
        providers: config_1.default.isTest() ? undefined : [accessLogger_1.GlobalAccessLogger],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map