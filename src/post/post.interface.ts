import { Document } from "mongoose";
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
import { Type } from "class-transformer";


export enum PostType {
    IMAGE = 'image',
    VIDEO = 'video'
}
export type PostPublicData = Readonly<{
    id: string;
    userId: string;
    isActive: boolean;
    media: string[];
    description: string;
    tagPeople: string[];
    tagProduct: string[];
    type: PostType;
    url: string;
}>;

export type PostMethods = {
    getPublicData: () => PostPublicData;
};

export type Post = Readonly<{

    id: string;
    userId: string;
    isActive: boolean;
    media: string;
    description: string;
    tagPeople: string[];
    tagProduct: string[];
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
      