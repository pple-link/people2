import { Service, Container } from "typedi";
import { BaseCommentService, IDepthCommentDTO } from "./BaseCommentService";
import { UserService } from "./UserService";
import { NormalBoardDepthComment } from "../models";
import { NormalBoardCommentService } from "./NormalBoardCommentService";

@Service()
export class NormalBoardDepthCommentService extends BaseCommentService<
  NormalBoardDepthComment
> {
  constructor() {
    super(NormalBoardDepthComment);
  }

  public async createOrUpdate(
    depthComment: IDepthCommentDTO
  ): Promise<NormalBoardDepthComment> {
    const normalBoardCommentService = Container.get(NormalBoardCommentService);
    const parentComment = await normalBoardCommentService.getById(
      depthComment.commentId
    );
    const userService = Container.get(UserService);
    const user = await userService.getById(depthComment.userId);
    return this.genericRepository.save({
      comment: depthComment.comment,
      ref: parentComment,
      user: user
    }) as Promise<NormalBoardDepthComment>;
  }
}
