import * as mongoose from "mongoose";

import {Category} from "./category.interface";

export const CategorySchema = new mongoose.Schema<Category>(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    name: {type: String},
    isActive: {type: Boolean, default: true},
    image: {type: String, default: null,},
    discription: {type: String},
    parentCategoryId: {type: mongoose.Schema.Types.ObjectId, required: false, default: null, ref: "Category"},
  },
  {timestamps: true},
);

/**
 * Methods.
 */
CategorySchema.methods.getPublicData = function () {
  const { userId, _id, name, isActive, image, discription, parentCategoryId } = this;
  return { userId, _id, name, isActive, image, discription, parentCategoryId };
};
