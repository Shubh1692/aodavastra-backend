import * as mongoose from "mongoose";

import {Post, PostType} from "./post.interface";

export const PostSchema = new mongoose.Schema<Post>(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    media: {type: String},
    description: {type: String},
    tagPeople: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    tagProduct: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    type: {type: String, enum: PostType},
    isActive: {type: Boolean, default: true},
  },
  {timestamps: true},
);

/**
 * Methods.
 */
PostSchema.methods.getPublicData = function () {
  const {
    userId,
    _id,
    media,
    description,
    tagPeople,
    tagProduct,
    type,
    isActive,
  } = this;
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
