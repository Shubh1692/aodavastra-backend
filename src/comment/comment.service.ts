import { Model } from "mongoose";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Comment } from "./comment.interface";
import { ErrorMessageException } from "../common/exceptions";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel("Comment") private readonly commentModel: Model<Comment>,
  ) { }



  async create(commentDto: Partial<Comment>, userId: string): Promise<Comment> {
    
    const comment = await this.commentModel.create({
      ...commentDto,
      userId,
      
    });
    return comment;
  }


  async delete(id: string, userId: string): Promise<Comment> {
    
    
    const comment = await this.commentModel.findOneAndUpdate({
      id, userId
    }, {
      isActive: false,
      userId,
    }, {
      new: true
    });
    if (!comment) {
      throw ErrorMessageException("User unable to delete comment");
    }
    return comment;
  }


}