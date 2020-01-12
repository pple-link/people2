import { Service } from "typedi";
import { ParticipationBoard } from "../models";
import { BaseBoardService, IBoardDTO } from "./BaseBoardService";
import { User, Participation } from "../models";
import { ShowFlag } from "../models/Enum";

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
      showFlag: ShowFlag["PENDING"],
      user: participationBoard.user
    });
  }

  public async findByUser(userId: number) {
    return await super.getByWhere({ user: userId }, ["comments"]);
  }
}
