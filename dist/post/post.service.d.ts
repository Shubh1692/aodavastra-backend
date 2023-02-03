/// <reference types="multer" />
import { Model } from "mongoose";
import { Post } from "./post.interface";
import { FileUploadService } from "../common/services/upload.service";
export declare class PostService {
    private readonly postModel;
    private readonly fileUploadService;
    searchForPosts(search: string, offset: number | undefined, limit: number | undefined): void;
    getAllPosts(offset: number | undefined, limit: number | undefined): void;
    constructor(postModel: Model<Post>, fileUploadService: FileUploadService);
    findPosts(page: number, itemsPerPage: number): Promise<{
        total: number;
        data: Post[];
        page: number;
        itemsPerPage: number;
    }>;
    findById(_id: string): Promise<Post>;
    create(userId: string, postDto: Partial<Post & {
        tagPeople: string;
        tagProduct: string;
    }>, media: Express.Multer.File): Promise<Post>;
    update(_id: string, userId: string, postDto: Partial<Post & {
        tagPeople: string;
        tagProduct: string;
    }>, media: Express.Multer.File): Promise<Post>;
}
