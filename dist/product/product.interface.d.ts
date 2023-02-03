import { Document, ObjectId } from "mongoose";
export declare type ProductPublicData = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    productName: string;
}>;
export declare type ProductMethods = {
    getPublicData: () => ProductPublicData;
};
export declare type Product = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    name: string;
}> & ProductMethods & Document;
export declare class ProductDto {
    readonly name: string;
}
