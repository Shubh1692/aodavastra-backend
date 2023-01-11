import * as mongoose from "mongoose";

import { Post, PostType } from "./post.interface";

export const PostSchema = new mongoose.Schema<Post>(
  {
    userId: { type: String, required: true, ref: 'User' },
    media: {type: String},
    tagPeople: [{type: String, ref: 'User'}],
    tagProduct: [{type: String}],
    type:{type: String, enum: PostType},
    isActive: { type: Boolean, default: true }
  }, 
  { timestamps: true },
);

/**
 * Methods.
 */
PostSchema.methods.getPublicData = function () {
  const { userId, _id, media, description, tagPeople, tagProduct, type, isActive } = this;
  return { userId, _id, media, description, tagPeople, tagProduct, type, isActive };
};
