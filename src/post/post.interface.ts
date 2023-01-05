import { Document } from "mongoose";

export enum PostType {
    IMAGE = 'image',
    VIDEO = 'video'
}
export type PostPublicData = Readonly<{
    id: string;
    userId: string;
    isActive: boolean;
    images: string[];
    description: string;
    tagPeople: string[];
    tagProduct: string[];
    type: PostType;
    url: string;
}>;

export type PostMethods = {
    getPublicData: () => PostPublicData;
};

export type Post = Readonly<{

    id: string;
    userId: string;
    isActive: boolean;
    images: string[];
    description: string;
    tagPeople: string[];
    tagProduct: string[];
    type: PostType;
    url: string;

}> &
    PostMethods &
    Document;
