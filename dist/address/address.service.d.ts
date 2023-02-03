import { Model } from "mongoose";
import { Address } from "./address.interface";
export declare class AddressService {
    private readonly addressModel;
    constructor(addressModel: Model<Address>);
    findByUserId(userId: string): Promise<Address[]>;
    findById(_id: string, userId: string): Promise<Address>;
    create(addressDto: Partial<Address>, userId: string): Promise<Address>;
    update(id: string, addressDto: Partial<Address>, userId: string): Promise<Address>;
    delete(id: string, userId: string): Promise<Address>;
}
