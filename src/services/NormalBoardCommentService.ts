import { Service, Container } from "typedi";
import { BaseCommentService, ICommentDTO } from "./BaseCommentService";
import { NormalBoard, NormalBoardComment } from "../models";
import { NormalBoardService } from "./NormalBoardService";

@Service()
export class NormalBoardCommentService extends BaseCommentService<
  NormalBoardComment
> {
  constructor() {
    super(NormalBoardComment);
  }

  public async save(comment: ICommentDTO): Promise<NormalBoardComment> {
    const normalBoardService = Container.get(NormalBoardService);
    const normalBoard = (await normalBoardService.getById(
      comment.boardId
    )) as NormalBoard;
    return await this.genericRepository.save({
      comment: comment.comment,
      normalBoard: normalBoard,
      user: comment.user
    });
  }
}
