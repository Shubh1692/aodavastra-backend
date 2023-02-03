"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose = require("mongoose");
const post_interface_1 = require("./post.interface");
exports.PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    media: { type: String },
    description: { type: String },
    tagPeople: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tagProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    type: { type: String, enum: post_interface_1.PostType },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.PostSchema.methods.getPublicData = function () {
    const { userId, _id, media, description, tagPeople, tagProduct, type, isActive, } = this;
    return {
        userId,
        _id,
        media,
        description,
        tagPeople,
        tagProduct,
        type,
        isActive,
    };
};
//# sourceMappingURL=post.schema.js.map