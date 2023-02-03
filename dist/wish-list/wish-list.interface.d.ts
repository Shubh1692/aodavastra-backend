import { Document, ObjectId } from "mongoose";
export declare type WishListPublicData = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    isActive: boolean;
}>;
export declare type WishListMethods = {
    getPublicData: () => WishListPublicData;
};
export declare type WishList = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    isActive: boolean;
}> & WishListMethods & Document;
export declare class WishListDto {
    readonly productId: ObjectId;
}
