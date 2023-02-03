"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.ProductSchema.methods.getPublicData = function () {
    const { userId, _id, name, isActive, } = this;
    return {
        userId,
        _id,
        name,
        isActive,
    };
};
//# sourceMappingURL=product.schema.js.map