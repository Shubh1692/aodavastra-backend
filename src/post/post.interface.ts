import { Document, ObjectId } from "mongoose";
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
    IsArray,
    ArrayMinSize,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export enum PostType {
    IMAGE = 'image',
    VIDEO = 'video'
}
export type PostPublicData = Readonly<{
    id: string;
    userId: ObjectId;
    isActive: boolean;
    media: string[];
    description: string;
    tagPeople: ObjectId[];
    tagProduct: ObjectId[];
    type: PostType;
    url: string;
}>;

export type PostMethods = {
    getPublicData: () => PostPublicData;
};

export type Post = Readonly<{

    id: string;
    userId: ObjectId;
    isActive: boolean;
    media: string;
    description: string;
    tagPeople: ObjectId[];
    tagProduct: ObjectId[];
    type: PostType;

}> &
    PostMethods &
    Document;



    export class PostDto {
      
        @ApiProperty({example: "description1"})
        @IsString()
        @IsNotEmpty()
        readonly description!: string;
      
        @ApiProperty({example: "tag-people"})
        @IsNotEmpty()
        readonly tagPeople!: string;
      
        @ApiProperty({example: "tag-product"})
        @IsNotEmpty()
        readonly tagProduct!: string;
      }
      