import { Service, Container } from "typedi";
import { BaseCommentService } from "./BaseCommentService";
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
    comment: string,
    boardId: number,
    userId: number
  ): Promise<DirectBoardComment> {
    const directBoardService = Container.get(DirectBoardService);
    const userService = Container.get(UserService);
    const directBoard = (await directBoardService.getById(
      boardId
    )) as DirectBoard;
    const user = await userService.getById(userId);
    return this.genericRepository.save({
      comment: comment,
      directBoard: directBoard,
      user: user
    });
  }
}
