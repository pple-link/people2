import { Service, Container } from "typedi";
import { BaseCommentService, ICommentDTO } from "./BaseCommentService";
import { ParticipationBoard, ParticipationBoardComment } from "../models";
import { ParticipationBoardService } from "./ParticipationBoardService";

@Service()
export class ParticipationBoardCommentService extends BaseCommentService<
  ParticipationBoardComment
> {
  constructor() {
    super(ParticipationBoardComment);
  }

  public async save(comment: ICommentDTO): Promise<ParticipationBoardComment> {
    const participatoinBoardService = Container.get(ParticipationBoardService);
    const participationBoard = (await participatoinBoardService.getById(
      comment.boardId
    )) as ParticipationBoard;
    return await this.genericRepository.save({
      comment: comment.comment,
      normalBoard: participationBoard,
      user: comment.user
    });
  }
}
