import {
    IsEmail,
    MinLength,
    MaxLength,
    IsUUID,
    IsString,
    IsOptional,
    IsBoolean,
    IsNotEmpty,
    IsObject,
  } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Document, ObjectId } from "mongoose";

export type CommentPublicData = Readonly<{
    _id: ObjectId;
    userId: ObjectId;
    postId: ObjectId;
    comment: string;
    isActive: boolean;
}>;

export type CommentMethods = {
    getPublicData: () => CommentPublicData;
};

export type Comment = Readonly<{
    _id: ObjectId;
    userId: ObjectId;
    postId: ObjectId;
    comment: string;
    isActive: boolean;

}> &
    CommentMethods &
    Document;




export class CommentDto {
    @ApiProperty({ example: "postId" })
    @IsString()
    @IsNotEmpty()
    readonly postId!: ObjectId;

    @ApiProperty({ example: "comment on post" })
    @IsString()
    @IsNotEmpty()
    readonly comment!: string;

}

