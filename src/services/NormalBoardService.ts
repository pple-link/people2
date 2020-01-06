import { Service } from "typedi";
import { BaseBoardService } from "./BaseBoardService";
import { IBoardDTO } from "./BaseBoardService";
import { NormalBoard, User } from "../models";

export interface INormalBoardDTO extends IBoardDTO {
  user: User;
}

@Service()
export class NormalBoardService extends BaseBoardService<NormalBoard> {
  constructor() {
    super(NormalBoard);
  }

  public async save(board: Partial<INormalBoardDTO>): Promise<NormalBoard> {
    return this.genericRepository.save({
      title: board.title,
      content: board.content,
      showFlag: board.showFlag,
      user: board.user!,
      comments: []
    });
  }

  public async getByUserId(userId: number): Promise<NormalBoard[]> {
    return super.getByWhere({
      where: { user: userId },
      relations: [/*"normalBoardComments"*/ "user"]
    }) as Promise<NormalBoard[]>;
  }
}
