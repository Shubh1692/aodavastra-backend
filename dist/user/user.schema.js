"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: { type: String, requried: true },
    bio: { type: String },
    isCreator: { type: Boolean, default: false },
    socialLinks: {
        instagram: { type: String },
        facebook: { type: String },
        snapchat: { type: String }
    },
    phoneNo: { type: String },
    provider: { type: String, default: "email" },
    profilePicture: { type: String },
    coverPicture: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
    isActive: { type: Boolean, default: false },
    activationToken: String,
    activationExpires: Date,
}, { timestamps: true });
exports.UserSchema.methods.getPublicData = function () {
    const { _id, name, bio, isCreator, socialLinks, phoneNo, provider, profilePicture, coverPicture, email, isActive } = this;
    return { _id, name, bio, isCreator, socialLinks, phoneNo, provider, profilePicture, coverPicture, email, isActive };
};
//# sourceMappingURL=user.schema.js.map