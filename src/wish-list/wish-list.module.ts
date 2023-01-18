import { Module } from "@nestjs/common";

import { WishListModel } from "./wish-list.model";

@Module({
  imports: [WishListModel],
  providers: [],
  exports: [],
})
export class WishListModule { }
