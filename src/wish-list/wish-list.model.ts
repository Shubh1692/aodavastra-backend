import { MongooseModule } from "@nestjs/mongoose";
import { WishListSchema } from "./wish-list.schema";

export const WishListModel = MongooseModule.forFeature([
  { name: "WishList", schema: WishListSchema },
]);
