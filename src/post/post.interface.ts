import { Document } from "mongoose";
import {
    IsEmail,
    MinLength,
    MaxLength,
    IsUUID,
    IsString,
    IsOptional,
    IsBoolean,
    IsNotEmpty,
    IsObject,
} from "class-validator";


export enum PostType {
    IMAGE = 'image',
    VIDEO = 'video'
}
export type PostPublicData = Readonly<{
    id: string;
    userId: string;
    isActive: boolean;
    media: string[];
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
    media: string[];
    description: string;
    tagPeople: string[];
    tagProduct: string[];
    type: PostType;
    url: string;

}> &
    PostMethods &
    Document;



