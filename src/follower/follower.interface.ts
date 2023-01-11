import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
import {Document, ObjectId} from "mongoose";

export type FollowerPublicData = Readonly<{
  id: string;
  followerUserId: ObjectId;
  followingUserId: ObjectId;
  isActive: boolean;
}>;

export type FollowerMethods = {
  getPublicData: () => FollowerPublicData;
};

export type Follower = Readonly<{
  id: string;
  followerUserId: ObjectId;
  followingUserId: ObjectId;
  isActive: boolean;
}> &
  FollowerMethods &
  Document;

export class FollowerDto {
  @ApiProperty({example: "uuid"})
  @IsString()
  @IsNotEmpty()
  readonly followingUserId!: ObjectId;
}
