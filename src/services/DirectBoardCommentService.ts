import { Service, Container } from "typedi";
import { BaseCommentService, ICommentDTO } from "./BaseCommentService";
import { DirectBoard, DirectBoardComment } from "../models";
import { DirectBoardService } from "./DirectBoardService";

@Service()
export class DirectBoardCommentService extends BaseCommentService<
  DirectBoardComment
> {
  constructor() {
    super(DirectBoardComment);
  }

  public async save(comment: ICommentDTO): Promise<DirectBoardComment> {
    const directBoardService = Container.get(DirectBoardService);
    const directBoard = (await directBoardService.getById(
      comment.boardId
    )) as DirectBoard;
    return await this.genericRepository.save({
      comment: comment.comment,
      directBoard: directBoard,
      user: comment.user
    });
  }
}
