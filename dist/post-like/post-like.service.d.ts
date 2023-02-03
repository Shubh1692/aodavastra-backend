import { Model } from "mongoose";
import { PostLike } from "./post-like.interface";
import { UserService } from "../user/user.service";
export declare class PostLikeService {
    private readonly postLikeModel;
    private readonly userService;
    constructor(postLikeModel: Model<PostLike>, userService: UserService);
    findPostLikeByUserId(userId: string): Promise<PostLike[]>;
    create(postLikeDto: Partial<PostLike>, userId: string): Promise<{
        postLike: boolean;
    }>;
    remove(postLikeDto: Partial<PostLike>, userId: string): Promise<{
        postLike: boolean;
    }>;
}
