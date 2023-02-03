"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("./comment.schema");
exports.CommentModel = mongoose_1.MongooseModule.forFeature([
    { name: "Comment", schema: comment_schema_1.CommentSchema },
]);
//# sourceMappingURL=comment.model.js.map