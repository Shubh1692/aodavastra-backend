import { Request } from "express";
import { WishListService } from "./wish-list.service";
import { WishListDto } from "./wish-list.interface";
export declare class WishListController {
    private readonly wishListService;
    constructor(wishListService: WishListService);
    wishLists(req: Request): Promise<import("./wish-list.interface").WishList[]>;
    addFollower(req: Request, wishListDto: WishListDto): Promise<{
        wishList: boolean;
    }>;
    removeFollower(req: Request, wishListDto: WishListDto): Promise<{
        wishList: boolean;
    }>;
}
