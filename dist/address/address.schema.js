"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
const mongoose = require("mongoose");
exports.AddressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    pinCode: { type: String, requried: true },
    city: { type: String, requried: true },
    state: { type: String, requried: true },
    address: {
        address1: { type: String, required: true },
        address2: { type: String },
    },
    name: { type: String },
    phoneNo: { type: String },
    isDefault: { type: Boolean, requried: true, default: false },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.AddressSchema.methods.getPublicData = function () {
    const { userId, _id, pinCode, city, state, address, name, phoneNo, isDefault, isActive } = this;
    return { userId, _id, pinCode, city, state, address, name, phoneNo, isDefault, isActive };
};
//# sourceMappingURL=address.schema.js.map