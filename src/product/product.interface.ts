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


export type ProductPublicData = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    productName: string;
    
}>;

export type ProductMethods = {
    getPublicData: () => ProductPublicData;
};

export type Product = Readonly<{

    id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    name: string;

}> &
    ProductMethods &
    Document;



export class ProductDto {

    @ApiProperty({ example: "toffee" })
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    
}

