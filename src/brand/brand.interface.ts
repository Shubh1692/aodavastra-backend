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


export type BrandPublicData = Readonly<{
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    image: string; 
    discription: string;
    isActive: boolean; 
}>;

export type BrandMethods = {
    getPublicData: () => BrandPublicData;
};

export type Brand = Readonly<{
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    image: string; 
    discription: string;
    isActive: boolean;
}> &
    BrandMethods &
    Document;



export class BrandDto {

    @ApiProperty({ example: "Adidas" })
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    @ApiProperty({ example: "text content" })
    @IsString()
    @IsOptional()
    readonly discription!: string;

    
}

