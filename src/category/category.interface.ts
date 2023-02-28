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
    IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";


export type CategoryPublicData = Readonly<{
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    image: string; 
    parentCategoryId: ObjectId;
    discription: string;
    isActive: boolean; 
}>;

export type CategoryMethods = {
    getPublicData: () => CategoryPublicData;
};

export type Category = Readonly<{
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    image: string; 
    parentCategoryId: ObjectId;
    discription: string;
    isActive: boolean;
}> &
    CategoryMethods &
    Document;



export class CategoryDto {

    @ApiProperty({ example: "mobile" })
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    @ApiProperty({ example: "uuid" })
    @IsString()
    @IsOptional()
    readonly parentCategoryId!: ObjectId;

    @ApiProperty({ example: "text content" })
    @IsString()
    @IsOptional()
    readonly discription!: string;

    
}

