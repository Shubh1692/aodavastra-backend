import { MongooseModule } from "@nestjs/mongoose";
import { FollowerSchema } from "./follower.schema";

export const FollowerModel = MongooseModule.forFeature([
  { name: "Follower", schema: FollowerSchema },
]);
