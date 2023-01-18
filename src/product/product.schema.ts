import * as mongoose from "mongoose";

import {Product} from "./product.interface";

export const ProductSchema = new mongoose.Schema<Product>(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    productName: {type: String},
    isActive: {type: Boolean, default: true},
  },
  {timestamps: true},
);

/**
 * Methods.
 */
ProductSchema.methods.getPublicData = function () {
  const {
    userId,
    _id,
    productName,
    isActive,
  } = this;
  return {
    userId,
    _id,
    productName,
    isActive,
  };
};
