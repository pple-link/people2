import { Service, Container } from "typedi";
import { BaseCommentService, IDepthCommentDTO } from "./BaseCommentService";
import { UserService } from "./UserService";
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
    const userService = Container.get(UserService);
    const user = await userService.getById(depthComment.userId);
    return this.genericRepository.save({
      comment: depthComment.comment,
      ref: parentComment,
      user: user
    }) as Promise<DirectBoardDepthComment>;
  }
}
