import { Service, Container } from "typedi";
import { BaseCommentService, ICommentDTO } from "./BaseCommentService";
import { UserService } from "./UserService";
import { DirectBoard, DirectBoardComment } from "../models";
import { DirectBoardService } from "./DirectBoardService";

@Service()
export class DirectBoardCommentService extends BaseCommentService<
  DirectBoardComment
> {
  constructor() {
    super(DirectBoardComment);
  }

  public async createOrUpdate(
    comment: ICommentDTO
  ): Promise<DirectBoardComment> {
    const directBoardService = Container.get(DirectBoardService);
    const userService = Container.get(UserService);
    const directBoard = (await directBoardService.getById(
      comment.boardId
    )) as DirectBoard;
    const user = await userService.getById(comment.userId);
    return this.genericRepository.save({
      comment: comment.comment,
      directBoard: directBoard,
      user: user
    });
  }
}
