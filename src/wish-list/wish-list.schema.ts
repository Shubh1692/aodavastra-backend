import * as mongoose from "mongoose";

import { WishList } from "./wish-list.interface";

export const WishListSchema = new mongoose.Schema<WishList>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true },
);
WishListSchema.index({ "userId": 1, "productId": 1 }, { "unique": true });
/**
 * Methods.
 */
WishListSchema.methods.getPublicData = function () {
  const { userId, _id, productId, isActive } = this;
  return { userId, _id, productId, isActive };
};

