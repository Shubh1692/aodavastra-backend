import {Model, ObjectId} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {WishList} from "./wish-list.interface";
import {ErrorMessageException} from "../common/exceptions";
import {UserService} from "../user/user.service";

@Injectable()
export class WishListService {
  constructor(
    @InjectModel("WishList") private readonly wishListModel: Model<WishList>,
    private readonly userService: UserService,
  ) {}

  async findwishListByUserId(userId: string): Promise<WishList[]> {
    const wishLists = await this.wishListModel
      .find({
        userId,
        isActive: true,
      }).populate("productId")
      
    return wishLists;
  }

  async create(
    wishListDto: Partial<WishList>,
    userId: string,
  ): Promise<{
    wishList: boolean;
  }> {
    try {
      const hasWishList = await this.wishListModel.findOne({
        productId: wishListDto.productId,
        userId
      });
      if (!hasWishList) {
        const wishList = await this.wishListModel.create({
          ...wishListDto,
          userId,
          isActive: true,
        });
      }
      return {
        wishList: true,
      };
    } catch (error) {
      const message = error as {message: string};
      throw ErrorMessageException(
        message?.message || "User unable to create wishlist",
      );
    }
  }


  async remove(
    wishListDto: Partial<WishList>,
    userId: string,
  ): Promise<{
    wishList: boolean;
  }> {
    try {
      await this.wishListModel.deleteOne({
        userId,
        productId: wishListDto.productId,
      });
      return {
        wishList: false,
      };
    } catch (error) {
      const message = error as {message: string};
      throw ErrorMessageException(
        message?.message || "User unable to delete wishlist",
      );
    }
  }
}
