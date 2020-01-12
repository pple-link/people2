import { Service, Container } from "typedi";
import { Participation, User, ParticipationBoard } from "../models";
import { BaseService } from "./BaseService";
import { DirectBoardService } from "./DirectBoardService";

@Service()
export class ParticipationService extends BaseService<Participation> {
  constructor(private boardService: DirectBoardService) {
    super(Participation);
    this.boardService = Container.get(DirectBoardService);
  }

  public async save(user: User, boardId: number): Promise<Participation> {
    const board = await this.boardService.getById(boardId);
    return await this.genericRepository.save({
      directBoard: board,
      participateUser: user
    });
  }

  public async update(
    id: number,
    participationBoard: ParticipationBoard
  ): Promise<void> {
    await this.genericRepository.update(id, {
      participationBoard: participationBoard
    });
  }

  public async findByUser(userId: number): Promise<Participation[]> {
    return await super.getByWhere({ participateUser: userId }, [
      "directBoard",
      "participateUser"
    ]);
  }
}
