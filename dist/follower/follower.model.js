"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const follower_schema_1 = require("./follower.schema");
exports.FollowerModel = mongoose_1.MongooseModule.forFeature([
    { name: "Follower", schema: follower_schema_1.FollowerSchema },
]);
//# sourceMappingURL=follower.model.js.map