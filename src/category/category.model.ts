import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./category.schema";

export const CategoryModel = MongooseModule.forFeature([
  { name: "Category", schema: CategorySchema },
]);
