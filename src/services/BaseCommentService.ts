import { BaseService } from "./BaseService";
import { BaseComment } from "../models";
import { ObjectType } from "./BaseService";
import { DeleteResult } from "typeorm";
export interface ICommentDTO {
  comment: string;
  boardId: number;
  userId: number;
}

export interface IDepthCommentDTO {
  comment: string;
  commentId: number;
  userId: number;
}

export abstract class BaseCommentService<
  T extends BaseComment
> extends BaseService<T> {
  constructor(repo: ObjectType<T>) {
    super(repo);
  }
  public async updateReportCount(id: number): Promise<BaseComment> {
    const comment = await (<Promise<T>>this.getById(id));
    const newComment: Partial<BaseComment> = {
      reportCount: comment.reportCount + 1
    };
    return this.genericRepository.save({ ...comment, ...newComment } as any);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await super.delete(id);
  }
}
