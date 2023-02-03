"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const post_schema_1 = require("./post.schema");
exports.PostModel = mongoose_1.MongooseModule.forFeature([
    { name: "Post", schema: post_schema_1.PostSchema },
]);
//# sourceMappingURL=post.model.js.map