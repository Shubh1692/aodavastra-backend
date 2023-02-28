import * as mongoose from "mongoose";

import {Product} from "./product.interface";

export const ProductSchema = new mongoose.Schema<Product>(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    name: {type: String},
    isActive: {type: Boolean, default: true},
    images: [{type: String}],
    discription: {type: String},
    categoryId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category"},
    brandId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Brand"},
    price: {type: Number},
    discount: {type: String},
    commission: {type: String},
    pinCode: [{type: String}],
    quantity: {type: Number, default: 0},
    endrosProduct: {type: Boolean, default: true},

  },
  {timestamps: true},
);

/**
 * Methods.
 */
ProductSchema.methods.getPublicData = function () {
  const { userId, _id, name, isActive, images, discription, categoryId, brandId, price,
    discount, commission, pinCode, quantity, endrosProduct } = this;
  return { userId, _id, name, isActive, images, discription, categoryId, brandId, price,
    discount, commission, pinCode, quantity, endrosProduct };
};
