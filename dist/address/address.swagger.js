"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("../common/swagger");
exports.default = (0, swagger_2.setupSwaggerDocument)("address", new swagger_1.DocumentBuilder()
    .setTitle("Address Docs")
    .setDescription("Basic user address features")
    .setVersion("1.0")
    .setBasePath("api")
    .addTag("address")
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: process.env.DEFAULT_TOKEN || 'Enter JWT token',
    in: 'header',
}, 'JWT-auth')
    .build());
//# sourceMappingURL=address.swagger.js.map