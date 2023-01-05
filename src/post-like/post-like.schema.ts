import * as mongoose from "mongoose";

import { PostLike } from "./post-like.interface";

export const PostLikeSchema = new mongoose.Schema<PostLike>(
  {
    userId: { type: String, required: true, unique: true, ref: 'User' },
    postId: { type: String, required: true, unique: true, ref: 'Post' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true },
);

/**
 * Methods.
 */
 PostLikeSchema.methods.getPublicData = function () {
  const { userId, _id, postId, isActive} = this;
  return { userId, _id, postId, isActive};
};
