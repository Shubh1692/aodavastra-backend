import { Document, ObjectId } from "mongoose";
export declare type FollowerPublicData = Readonly<{
    id: string;
    followerUserId: ObjectId;
    followingUserId: ObjectId;
    isActive: boolean;
}>;
export declare type FollowerMethods = {
    getPublicData: () => FollowerPublicData;
};
export declare type Follower = Readonly<{
    id: string;
    followerUserId: ObjectId;
    followingUserId: ObjectId;
    isActive: boolean;
}> & FollowerMethods & Document;
export declare class FollowerDto {
    readonly followingUserId: ObjectId;
}
