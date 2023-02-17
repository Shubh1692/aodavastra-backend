import * as mongoose from "mongoose";

import {Brand} from "./brand.interface";

export const BrandSchema = new mongoose.Schema<Brand>(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    name: {type: String},
    isActive: {type: Boolean, default: true},
    image: {type: String, default: null,},
    discription: {type: String}
    },
  {timestamps: true},
);

/**
 * Methods.
 */
BrandSchema.methods.getPublicData = function () {
  const { userId, _id, name, isActive, image, discription } = this;
  return { userId, _id, name, isActive, image, discription };
};
