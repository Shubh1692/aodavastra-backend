import * as mongoose from "mongoose";

import { Post, PostType } from "./post.interface";

export const PostSchema = new mongoose.Schema<Post>(
  {
    userId: { type: String, required: true, unique: true, ref: 'User' },
    id: { type: String, requried: true },
    images: [{type: String}],
    tagPeople: [{type: String}],
    tagProduct: [{type: String}],
    type:{type: String, enum: PostType},
    url: {type: String},
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true },
);

/**
 * Methods.
 */
PostSchema.methods.getPublicData = function () {
  const { userId, id, images, description, tagPeople, tagProduct, type, url, isActive } = this;
  return { userId, id, images, description, tagPeople, tagProduct, type, url, isActive };
};
