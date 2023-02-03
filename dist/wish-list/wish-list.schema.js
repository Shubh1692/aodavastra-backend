"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListSchema = void 0;
const mongoose = require("mongoose");
exports.WishListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.WishListSchema.index({ "userId": 1, "productId": 1 }, { "unique": true });
exports.WishListSchema.methods.getPublicData = function () {
    const { userId, _id, productId, isActive } = this;
    return { userId, _id, productId, isActive };
};
//# sourceMappingURL=wish-list.schema.js.map