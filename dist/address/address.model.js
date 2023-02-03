"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const address_schema_1 = require("./address.schema");
exports.AddressModel = mongoose_1.MongooseModule.forFeature([
    { name: "Address", schema: address_schema_1.AddressSchema },
]);
//# sourceMappingURL=address.model.js.map