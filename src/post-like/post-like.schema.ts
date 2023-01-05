import * as mongoose from "mongoose";

import { PostLike } from "./post-like.interface";

export const PostLikeSchema = new mongoose.Schema<PostLike>(
  {
    id: { type: String, requried: true },
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
  const { userId, id, postId, isActive} = this;
  return { userId, id, postId, isActive};
};
