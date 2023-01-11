import * as mongoose from "mongoose";

import { PostLike } from "./post-like.interface";

export const PostLikeSchema = new mongoose.Schema<PostLike>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true },
);
PostLikeSchema.index({ "userId": 1, "postId": 1}, { "unique": true });
/**
 * Methods.
 */
 PostLikeSchema.methods.getPublicData = function () {
  const { userId, _id, postId, isActive} = this;
  return { userId, _id, postId, isActive};
};

