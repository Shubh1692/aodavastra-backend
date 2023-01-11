import * as mongoose from "mongoose";

import { Follower } from "./follower.interface";

export const FollowerSchema = new mongoose.Schema<Follower>(
  {
    followerUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    followingUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true },
);
FollowerSchema.index({ "followerUserId": 1, "followingUserId": 1}, { "unique": true });
/**
 * Methods.
 */
 FollowerSchema.methods.getPublicData = function () {
  const { _id, followerUserId, followingUserId, isActive } = this;
  return { _id, followerUserId, followingUserId, isActive };
};
 