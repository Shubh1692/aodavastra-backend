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


export type InfluencerCategoryPublicData = Readonly<{
    _id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    name: string;
    image: string;
    discription: string; 
    productId: ObjectId[];
}>;

export type InfluencerCategoryMethods = {
    getPublicData: () => InfluencerCategoryPublicData;
};

export type InfluencerCategory = Readonly<{

    _id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    name: string;
    image: string;
    discription: string; 
    productId: ObjectId[];

}> &
    InfluencerCategoryMethods &
    Document;



export class InfluencerCategoryDto {

    @ApiProperty({ example: "toffee" })
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    
}

