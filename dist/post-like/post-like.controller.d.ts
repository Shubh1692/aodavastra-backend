import { Request } from "express";
import { PostLikeService } from "./post-like.service";
import { PostLikeDto } from "./post-like.interface";
export declare class PostLikeController {
    private readonly wishListService;
    constructor(wishListService: PostLikeService);
    wishLists(req: Request): Promise<import("./post-like.interface").PostLike[]>;
    addFollower(req: Request, wishListDto: PostLikeDto): Promise<{
        postLike: boolean;
    }>;
    removeFollower(req: Request, wishListDto: PostLikeDto): Promise<{
        postLike: boolean;
    }>;
}
