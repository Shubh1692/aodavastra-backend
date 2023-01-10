import { MongooseModule } from "@nestjs/mongoose";
import { CommentSchema } from "./comment.schema";

export const CommentModel = MongooseModule.forFeature([
  { name: "Comment", schema: CommentSchema },
]);
