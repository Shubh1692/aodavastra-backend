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
    _id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    name: string;
    images: string[];
    discription: string; 
    categoryId: ObjectId;
    brandId: ObjectId;
    price: number;
    discount: string;
    commission: string;
    pinCode: string[];
    quantity: number;
    endrosProduct: boolean;
    
}>;

export type ProductMethods = {
    getPublicData: () => ProductPublicData;
};

export type Product = Readonly<{

    _id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    name: string;
    images: string[];
    discription: string; 
    categoryId: ObjectId;
    brandId: ObjectId;
    price: number;
    discount: string;
    commission: string;
    pinCode: string[];
    quantity: number;
    endrosProduct: boolean;

}> &
    ProductMethods &
    Document;



export class ProductDto {

    @ApiProperty({ example: "toffee" })
    @IsString()
    @IsNotEmpty()
    readonly name!: string;

    
}

