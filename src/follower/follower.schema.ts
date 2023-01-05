import * as mongoose from "mongoose";

import { Follower } from "./follower.interface";

export const FollowerSchema = new mongoose.Schema<Follower>(
  {
    id: { type: String, requried: true },
    followerUserId: { type: String, required: true, unique: true, ref: 'User' },
    followingUserId: { type: String, required: true, unique: true, ref: 'User' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true },
);

/**
 * Methods.
 */
 FollowerSchema.methods.getPublicData = function () {
  const { id, followerUserId, followingUserId, isActive } = this;
  return { id, followerUserId, followingUserId, isActive };
};
 