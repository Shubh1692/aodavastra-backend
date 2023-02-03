"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("../common/swagger");
exports.default = (0, swagger_2.setupSwaggerDocument)("wish-list", new swagger_1.DocumentBuilder()
    .setTitle("WishList Docs")
    .setDescription("Basic user follow features")
    .setVersion("1.0")
    .setBasePath("api")
    .addTag("wish-list")
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: process.env.DEFAULT_TOKEN || 'Enter JWT token',
    in: 'header',
}, 'JWT-auth')
    .build());
//# sourceMappingURL=wish-list.swagger.js.map