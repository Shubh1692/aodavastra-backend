import { Model } from "mongoose";
import { Follower } from "./follower.interface";
import { UserService } from "../user/user.service";
export declare class FollowerService {
    private readonly followerModel;
    private readonly userService;
    constructor(followerModel: Model<Follower>, userService: UserService);
    findFollowingUsersByUserId(followerUserId: string): Promise<Follower[]>;
    findFollowerUsersByUserId(followingUserId: string): Promise<Follower[]>;
    findFlowingAndFollowerCountByUserId(userId: string): Promise<{
        following: number;
        followers: number;
    }>;
    create(followerDto: Partial<Follower>, followerUserId: string): Promise<{
        follow: boolean;
    }>;
    remove(followerDto: Partial<Follower>, followerUserId: string): Promise<{
        follow: boolean;
    }>;
}
