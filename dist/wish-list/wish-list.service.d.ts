import { Model } from "mongoose";
import { WishList } from "./wish-list.interface";
import { UserService } from "../user/user.service";
export declare class WishListService {
    private readonly wishListModel;
    private readonly userService;
    constructor(wishListModel: Model<WishList>, userService: UserService);
    findWishListByUserId(userId: string): Promise<WishList[]>;
    create(wishListDto: Partial<WishList>, userId: string): Promise<{
        wishList: boolean;
    }>;
    remove(wishListDto: Partial<WishList>, userId: string): Promise<{
        wishList: boolean;
    }>;
}
