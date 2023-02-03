import { Request } from "express";
import { FollowerService } from "./follower.service";
import { FollowerDto } from "./follower.interface";
export declare class FollowerController {
    private readonly followerService;
    constructor(followerService: FollowerService);
    followers(req: Request): Promise<import("./follower.interface").Follower[]>;
    following(req: Request): Promise<import("./follower.interface").Follower[]>;
    addFollower(req: Request, followerDto: FollowerDto): Promise<{
        follow: boolean;
    }>;
    removeFollower(req: Request, followerDto: FollowerDto): Promise<{
        follow: boolean;
    }>;
}
