import { Document } from "mongoose";

export type PostLikePublicData = Readonly<{
    id: string;
    userId: string;
    postId: string;
    isActive: boolean;
    }>;

export type PostLikeMethods = {
    getPublicData: () => PostLikePublicData;
};

export type PostLike = Readonly<{
    id: string;
    userId: string;
    postId: string;
    isActive: boolean;

}> &
    PostLikeMethods &
    Document;
