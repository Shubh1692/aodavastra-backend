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
import { Document } from "mongoose";

export type CommentPublicData = Readonly<{
    id: string;
    userId: string;
    postId: string;
    comment: string;
    isActive: boolean;
}>;

export type CommentMethods = {
    getPublicData: () => CommentPublicData;
};

export type Comment = Readonly<{
    id: string;
    userId: string;
    postId: string;
    comment: string;
    isActive: boolean;

}> &
    CommentMethods &
    Document;




export class CommentDto {
    @ApiProperty({ example: "postId" })
    @IsString()
    @IsNotEmpty()
    readonly postId!: string;

    @ApiProperty({ example: "comment on post" })
    @IsString()
    @IsNotEmpty()
    readonly comment!: string;

}

