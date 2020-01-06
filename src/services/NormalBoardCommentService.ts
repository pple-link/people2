import { Service, Container } from "typedi";
import { BaseCommentService, ICommentDTO } from "./BaseCommentService";
import { UserService } from "./UserService";
import { NormalBoard, NormalBoardComment } from "../models";
import { NormalBoardService } from "./NormalBoardService";

@Service()
export class NormalBoardCommentService extends BaseCommentService<
  NormalBoardComment
> {
  constructor() {
    super(NormalBoardComment);
  }

  public async createOrUpdate(
    comment: ICommentDTO
  ): Promise<NormalBoardComment> {
    const normalBoardService = Container.get(NormalBoardService);
    const userService = Container.get(UserService);
    const normalBoard = (await normalBoardService.getById(
      comment.boardId
    )) as NormalBoard;
    const user = await userService.getById(comment.userId);
    console.log(user);
    return this.genericRepository.save({
      comment: comment.comment,
      normalBoard: normalBoard,
      user: user
    });
  }
}
