import * as mongoose from "mongoose";

import {InfluencerCategory} from "./influencer-category.interface";

export const InfluencerCategorySchema = new mongoose.Schema<InfluencerCategory>(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    name: {type: String},
    image: {type: String},
    isActive: {type: Boolean, default: true},
    discription: {type: String},
    productId: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category"}],
    
  },
  {timestamps: true},
);

/**
 * Methods.
 */
InfluencerCategorySchema.methods.getPublicData = function () {
  const { userId, _id, name, image, isActive, discription, productId } = this;
  return { userId, _id, name, image, isActive, discription, productId };
};
