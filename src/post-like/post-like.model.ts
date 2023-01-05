import { MongooseModule } from "@nestjs/mongoose";
import { PostLikeSchema } from "./post-like.schema";

export const PostLikeModel = MongooseModule.forFeature([
  { name: "PostLike", schema: PostLikeSchema },
]);
