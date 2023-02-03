import { Request } from "express";
import { AddressService } from "./address.service";
import { AddressDto } from "./address.interface";
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    addresses(req: Request): Promise<import("./address.interface").Address[]>;
    address(id: string, req: Request): Promise<import("./address.interface").Address>;
    addAddress(req: Request, addressDto: AddressDto): Promise<import("./address.interface").Address>;
    updateAddress(id: string, req: Request, addressDto: AddressDto): Promise<import("./address.interface").Address>;
    deleteAddress(id: string, req: Request): Promise<import("./address.interface").Address>;
}
