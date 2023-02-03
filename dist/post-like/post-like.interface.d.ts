import { Document, ObjectId } from "mongoose";
export declare type PostLikePublicData = Readonly<{
    id: string;
    userId: ObjectId;
    postId: ObjectId;
    isActive: boolean;
}>;
export declare type PostLikeMethods = {
    getPublicData: () => PostLikePublicData;
};
export declare type PostLike = Readonly<{
    id: string;
    userId: ObjectId;
    postId: ObjectId;
    isActive: boolean;
}> & PostLikeMethods & Document;
export declare class PostLikeDto {
    readonly postId: ObjectId;
}
