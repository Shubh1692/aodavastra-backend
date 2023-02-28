import { MongooseModule } from "@nestjs/mongoose";
import { BrandSchema } from "./brand.schema";

export const BrandModel = MongooseModule.forFeature([
  { name: "Brand", schema: BrandSchema },
]);
