import * as mongoose from "mongoose";

import {User} from "./user.interface";

export const UserSchema = new mongoose.Schema<User>(
  {
    id: { type: String, requried: true },
    name: { type: String, requried: true },
    bio: { type: String },
    isCreator: { type: Boolean, default: false },
    socialLinks: {
       instagram: {type: String},
       facebook: {type: String},
       snapchat: {type: String}
    },
    phoneNo: {type: String},
    provider: {type: String},
    profilePicture: {type: String},
    coverPicture: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    passwordResetToken: String,
    passwordResetExpires: Date,
    isActive: {type: Boolean, default: false},
    activationToken: String,
    activationExpires: Date,
  },
  {timestamps: true},
);

/**
 * Methods.
 */
UserSchema.methods.getPublicData = function () {
  const {id, name, bio, isCreator, socialLinks, phoneNo, provider, profilePicture, coverPicture, email, isActive} = this;
  return {id, name, bio, isCreator, socialLinks, phoneNo, provider, profilePicture, coverPicture, email, isActive};
};
