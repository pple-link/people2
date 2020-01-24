import { Service, Container } from "typedi";
import { BaseCommentService, IDepthCommentDTO } from "./BaseCommentService";
import { DirectBoardDepthComment } from "../models";
import { DirectBoardCommentService } from "./DirectBoardCommentService";

@Service()
export class DirectBoardDepthCommentService extends BaseCommentService<
  DirectBoardDepthComment
> {
  constructor() {
    super(DirectBoardDepthComment);
  }

  public async createOrUpdate(
    depthComment: IDepthCommentDTO
  ): Promise<DirectBoardDepthComment> {
    const directBoardCommentService = Container.get(DirectBoardCommentService);
    const parentComment = await directBoardCommentService.getById(
      depthComment.commentId
    );
    return this.genericRepository.save({
      comment: depthComment.comment,
      ref: parentComment,
      user: depthComment.user
    }) as Promise<DirectBoardDepthComment>;
  }
}
