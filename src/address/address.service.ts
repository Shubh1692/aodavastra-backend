import {Model} from "mongoose";
import {ConflictException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {Address} from "./address.interface";
import { ErrorMessageException } from "../common/exceptions";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel("Address") private readonly addressModel: Model<Address>,
  ) {}

  async findByUserId(userId: string): Promise<Address[]> {
    const addresses = await this.addressModel.find({
      userId,
      isActive: true
    });
    return addresses;
  }

  async findById(id: string, userId: string): Promise<Address> {
    const address = await this.addressModel.findOne({
      id,
      userId,
      isActive: true
    });
    if (!address) {
      throw ErrorMessageException("User unable to fetch address");
    }
    return address;
  }

  async create(addressDto: Partial<Address>, userId: string): Promise<Address> {
    const address = await this.addressModel.create({
      ...addressDto,
      userId,
    });
    return address;
  }

  async update(id: string, addressDto: Partial<Address>, userId: string): Promise<Address> {
    const address = await this.addressModel.findOneAndUpdate({
      id, userId, isActive: true
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
