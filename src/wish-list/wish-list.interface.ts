import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Document, ObjectId } from "mongoose";

export type WishListPublicData = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    isActive: boolean;
}>;

export type WishListMethods = {
    getPublicData: () => WishListPublicData;
};

export type WishList = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    isActive: boolean;

}> &
    WishListMethods &
    Document;


export class WishListDto {

    @ApiProperty({ example: "uuid" })
    @IsString()
    @IsNotEmpty()
    readonly productId!: ObjectId;
}