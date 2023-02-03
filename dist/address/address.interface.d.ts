import { Document, ObjectId } from "mongoose";
export declare type AddressPublicData = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    pinCode: string;
    city: string;
    state: string;
    address: {
        address1: string;
        address2: string;
    };
    name: string;
    phoneNo: string;
    isDefault: Boolean;
}>;
export declare type AddressMethods = {
    getPublicData: () => AddressPublicData;
};
export declare type Address = Readonly<{
    userId: ObjectId;
    id: string;
    pinCode: string;
    isActive: boolean;
    city: string;
    state: string;
    address: {
        address1: string;
        address2: string;
    };
    name: string;
    phoneNo: string;
    isDefault: boolean;
}> & AddressMethods & Document;
export declare class AddressLineDto {
    readonly address1: string;
    readonly address2: string;
}
export declare class AddressDto {
    readonly name: string;
    readonly isDefault: boolean;
    readonly pinCode: string;
    readonly city: string;
    readonly state: string;
    readonly address: AddressLineDto;
    readonly phoneNo: string;
}
