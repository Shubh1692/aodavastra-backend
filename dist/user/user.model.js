"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
exports.UserModel = mongoose_1.MongooseModule.forFeature([
    { name: "User", schema: user_schema_1.UserSchema },
]);
//# sourceMappingURL=user.model.js.map