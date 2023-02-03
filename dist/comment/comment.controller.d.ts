import { Request } from "express";
import { CommentService } from "./comment.service";
import { CommentDto } from "./comment.interface";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    addAddress(req: Request, commentDto: CommentDto): Promise<import("./comment.interface").Comment>;
    getCommentId(req: Request, id: string): Promise<import("./comment.interface").Comment>;
    deleteAddress(id: string, req: Request): Promise<import("./comment.interface").Comment>;
}
