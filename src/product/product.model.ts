import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.schema";

export const ProductModel = MongooseModule.forFeature([
  { name: "Product", schema: ProductSchema },
]);
