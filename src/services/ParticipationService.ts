import { Service, Container } from "typedi";
import { Participation } from "../models";
import { BaseService } from "./BaseService";
import { UserService } from "./UserService";
import { DirectBoardService } from "./DirectBoardService";

@Service()
export class ParticipationService extends BaseService<Participation> {
  constructor(
    private userService: UserService,
    private boardService: DirectBoardService
  ) {
    super(Participation);
    this.userService = Container.get(UserService);
    this.boardService = Container.get(DirectBoardService);
  }

  public async save(userId: number, boardId: number) {
    const user = await this.userService.getById(userId);
    const board = await this.boardService.getById(boardId);

    return await this.genericRepository.save({
      DirectBoard: board,
      participateUser: user
    });
  }

  public async findByUser(userId: number): Promise<Participation> {
    return await super.getByWhere({ participateUser: userId }, [
      "directBoard",
      "participateUser"
    ]);
  }
}
