import { Document, ObjectId } from "mongoose";
export declare enum PostType {
    IMAGE = "image",
    VIDEO = "video"
}
export declare type PostPublicData = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    media: string[];
    description: string;
    tagPeople: ObjectId[];
    tagProduct: ObjectId[];
    type: PostType;
    url: string;
}>;
export declare type PostMethods = {
    getPublicData: () => PostPublicData;
};
export declare type Post = Readonly<{
    id: ObjectId;
    userId: ObjectId;
    isActive: boolean;
    media: string;
    description: string;
    tagPeople: ObjectId[];
    tagProduct: ObjectId[];
    type: PostType;
}> & PostMethods & Document;
export declare class PostDto {
    readonly description: string;
    readonly tagPeople: string;
    readonly tagProduct: string;
}
export declare class PaginationParams {
    readonly page: number;
    readonly itemsPerPage: number;
}
