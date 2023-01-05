import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "./post.schema";

export const PostModel = MongooseModule.forFeature([
  { name: "Post", schema: PostSchema },
]);
