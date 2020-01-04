import { Service } from "typedi";
import { ParticipationBoard } from "../models";
import { BaseBoardService, IBoardDTO } from "./BaseBoardService";
import { User, Participation } from "../models";

export interface IParticipationBoardDTO extends IBoardDTO {
  user: User;
  participation: Participation;
}

@Service()
export class ParticipationBoardService extends BaseBoardService<
  ParticipationBoard
> {
  constructor() {
    super(ParticipationBoard);
  }

  public async save(
    participationBoard: Partial<IParticipationBoardDTO>
  ): Promise<ParticipationBoard> {
    return await this.genericRepository.save({
      title: participationBoard.title,
      content: participationBoard.content,
      showFlag: participationBoard.showFlag,
      user: participationBoard.user!,
      comments: [],
      participation: participationBoard.participation!
    });
  }

  public async findByUser(userId: number) {
    return await super.getByWhere({ user: userId }, ["comments"]);
  }
}
