import { MongooseModule } from "@nestjs/mongoose";
import { InfluencerCategorySchema } from "./influencer-category.schema";

export const InfluencerCategoryModel = MongooseModule.forFeature([
  { name: "InfluencerCategory", schema: InfluencerCategorySchema },
]);