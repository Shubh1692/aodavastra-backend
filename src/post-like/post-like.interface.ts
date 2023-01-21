import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import {Document, ObjectId} from "mongoose";

export type PostLikePublicData = Readonly<{
  id: string;
  userId: ObjectId;
  postId: ObjectId;
  isActive: boolean;
}>;

export type PostLikeMethods = {
  getPublicData: () => PostLikePublicData;
};

export type PostLike = Readonly<{
  id: string;
  userId: ObjectId;
  postId: ObjectId;
  isActive: boolean;
}> &
  PostLikeMethods &
  Document;

export class PostLikeDto {
  @ApiProperty({example: "uuid"})
  @IsString()
  @IsNotEmpty()
  readonly postId!: ObjectId;
}
