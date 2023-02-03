"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./product.schema");
exports.ProductModel = mongoose_1.MongooseModule.forFeature([
    { name: "Product", schema: product_schema_1.ProductSchema },
]);
//# sourceMappingURL=product.model.js.map