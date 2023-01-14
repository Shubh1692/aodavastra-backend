import { Model } from "mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Address } from "./address.interface";
import { ErrorMessageException } from "../common/exceptions";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel("Address") private readonly addressModel: Model<Address>,
  ) { }

  async findByUserId(userId: string): Promise<Address[]> {
    const addresses = await this.addressModel.find({
      userId,
      isActive: true
    }).sort({
      isDefault: -1
    });
    return addresses;
  }

  async findById(_id: string, userId: string): Promise<Address> {
    const address = await this.addressModel.findOne({
      _id,
      userId,
      isActive: true
    });
    if (!address) {
      throw ErrorMessageException("User unable to fetch address");
    }
    return address;
  }

  async create(addressDto: Partial<Address>, userId: string): Promise<Address> {
    const oldDefaultAddress = await this.addressModel.findOne({
      userId, isActive: true, isDeault: true
    });
    if (addressDto.isDefault) {
      if (oldDefaultAddress) {
        oldDefaultAddress.set({
          isDefault: false
        });
        await oldDefaultAddress.save();
      }
    }
    const address = await this.addressModel.create({
      ...addressDto,
      userId,
      isDefault: !oldDefaultAddress ? true : addressDto.isDefault
    });
    return address;
  }

  async update(id: string, addressDto: Partial<Address>, userId: string): Promise<Address> {
    const oldDefaultAddress = await this.addressModel.findOne({
      userId, isActive: true, isDeault: true
    });
    if (addressDto.isDefault) {
      if (oldDefaultAddress?._id !== id) {
          oldDefaultAddress?.set({
            isDefault: false
          })
        await oldDefaultAddress?.save()
      }
    } else {
      if (oldDefaultAddress?._id === id){
        throw ErrorMessageException("User unable to update address"); 
      }
    }
    const address = await this.addressModel.findOneAndUpdate({
      id, userId, isActive: true,
    }, {
      ...addressDto,
      userId,
    }, {
      new: true
    });

    if (!address) {
      throw ErrorMessageException("User unable to update address");
    }

    return address;
  }

  async delete(id: string, userId: string): Promise<Address> {
    const oldDefaultAddress = await this.addressModel.findOne({
      userId, isActive: true, isDeault: true
    });
    if (oldDefaultAddress?._id === id){
      throw ErrorMessageException("User unable to delete address"); 
    }
    const address = await this.addressModel.findOneAndUpdate({
      id, userId
    }, {
      isActive: false,
      userId,
    }, {
      new: true
    });
    if (!address) {
      throw ErrorMessageException("User unable to delete address");
    }
    return address;
  }
}
