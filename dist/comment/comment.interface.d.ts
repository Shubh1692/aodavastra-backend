import { Document, ObjectId } from "mongoose";
export declare type CommentPublicData = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    postId: ObjectId;
    comment: string;
    isActive: boolean;
}>;
export declare type CommentMethods = {
    getPublicData: () => CommentPublicData;
};
export declare type Comment = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    postId: ObjectId;
    comment: string;
    isActive: boolean;
}> & CommentMethods & Document;
export declare class CommentDto {
    readonly postId: ObjectId;
    readonly comment: string;
}
