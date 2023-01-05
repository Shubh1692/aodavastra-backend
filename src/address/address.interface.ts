import { Document } from "mongoose";

export type AddressPublicData = Readonly<{
    id: string;
    userId: string;
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

export type AddressMethods = {
    getPublicData: () => AddressPublicData;
};

export type Address = Readonly<{

    userId: string;
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
    isDefault: Boolean;

}> &
    AddressMethods &
    Document;
