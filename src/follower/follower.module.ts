import { Module } from "@nestjs/common";

import { FollowerModel } from "./follower.model";

@Module({
  imports: [FollowerModel],
  providers: [],
  exports: [],
})
export class FollowerModule { }
