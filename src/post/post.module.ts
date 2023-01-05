import { Module } from "@nestjs/common";

import { PostModel } from "./post.model";

@Module({
  imports: [PostModel],
  providers: [],
  exports: [],
})
export class PostModule { }
