import { Model } from "mongoose";
import { Comment } from "./comment.interface";
export declare class CommentService {
    private readonly commentModel;
    constructor(commentModel: Model<Comment>);
    findById(_id: string): Promise<Comment>;
    create(commentDto: Partial<Comment>, userId: string): Promise<Comment>;
    delete(id: string, userId: string): Promise<Comment>;
}
