import * as mongoose from "mongoose";

import {Product} from "./product.interface";

export const ProductSchema = new mongoose.Schema<Product>(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    name: {type: String},
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
    name,
    isActive,
  } = this;
  return {
    userId,
    _id,
    name,
    isActive,
  };
};
