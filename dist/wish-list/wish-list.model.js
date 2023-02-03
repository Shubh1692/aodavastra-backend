"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const wish_list_schema_1 = require("./wish-list.schema");
exports.WishListModel = mongoose_1.MongooseModule.forFeature([
    { name: "WishList", schema: wish_list_schema_1.WishListSchema },
]);
//# sourceMappingURL=wish-list.model.js.map