import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
import {Document} from "mongoose";

export type FollowerPublicData = Readonly<{
  id: string;
  followerUserId: string;
  followingUserId: string;
  isActive: boolean;
}>;

export type FollowerMethods = {
  getPublicData: () => FollowerPublicData;
};

export type Follower = Readonly<{
  id: string;
  followerUserId: string;
  followingUserId: string;
  isActive: boolean;
}> &
  FollowerMethods &
  Document;

export class FollowerDto {
  @ApiProperty({example: "uuid"})
  @IsString()
  @IsNotEmpty()
  readonly followingUserId!: string;
}
