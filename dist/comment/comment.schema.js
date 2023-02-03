"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
const mongoose = require("mongoose");
exports.CommentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    comment: { type: String, },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.CommentSchema.methods.getPublicData = function () {
    const { _id, userId, postId, comment, isActive } = this;
    return { _id, userId, postId, comment, isActive };
};
//# sourceMappingURL=comment.schema.js.map