import { Module } from "@nestjs/common";

import { PostLikeModel } from "./post-like.model";

@Module({
  imports: [PostLikeModel],
  providers: [],
  exports: [],
})
export class PostLikeModule { }
