"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikeModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const post_like_schema_1 = require("./post-like.schema");
exports.PostLikeModel = mongoose_1.MongooseModule.forFeature([
    { name: "PostLike", schema: post_like_schema_1.PostLikeSchema },
]);
//# sourceMappingURL=post-like.model.js.map