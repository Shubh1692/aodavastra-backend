"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikeSchema = void 0;
const mongoose = require("mongoose");
exports.PostLikeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.PostLikeSchema.index({ "userId": 1, "postId": 1 }, { "unique": true });
exports.PostLikeSchema.methods.getPublicData = function () {
    const { userId, _id, postId, isActive } = this;
    return { userId, _id, postId, isActive };
};
//# sourceMappingURL=post-like.schema.js.map