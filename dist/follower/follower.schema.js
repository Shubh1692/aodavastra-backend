"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerSchema = void 0;
const mongoose = require("mongoose");
exports.FollowerSchema = new mongoose.Schema({
    followerUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    followingUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.FollowerSchema.index({ "followerUserId": 1, "followingUserId": 1 }, { "unique": true });
exports.FollowerSchema.methods.getPublicData = function () {
    const { _id, followerUserId, followingUserId, isActive } = this;
    return { _id, followerUserId, followingUserId, isActive };
};
//# sourceMappingURL=follower.schema.js.map