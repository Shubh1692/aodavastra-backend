/// <reference types="multer" />
import { Request } from "express";
import { PostService } from "./post.service";
import { PostDto, PaginationParams } from "./post.interface";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    posts(req: Request, { page, itemsPerPage }: PaginationParams): Promise<{
        total: number;
        data: import("./post.interface").Post[];
        page: number;
        itemsPerPage: number;
    }>;
    post(id: string, req: Request): Promise<import("./post.interface").Post>;
    addPost(req: Request, media: Express.Multer.File, postDto: PostDto): Promise<import("./post.interface").Post>;
    updatePost(media: Express.Multer.File, req: Request, postDto: PostDto, id: string): Promise<import("./post.interface").Post>;
}
