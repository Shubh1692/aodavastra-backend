import * as mongoose from "mongoose";

import { Comment } from "./comment.interface";

export const CommentSchema = new mongoose.Schema<Comment>(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    comment: { type: String,  },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true },
);

/**
 * Methods.
 */
 CommentSchema.methods.getPublicData = function () {
  const { _id, userId, postId, comment, isActive } = this;
  return { _id, userId, postId, comment, isActive };
};
 