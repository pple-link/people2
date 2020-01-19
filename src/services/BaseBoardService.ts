import { Service } from "typedi";
import { BaseService, ObjectType } from "./BaseService";
import { ShowFlag } from "../models/Enum";
import { BaseBoard } from "../models/BaseBoard";
import { Like } from "typeorm";
import _ from "lodash";

export interface IBoardDTO {
  title: string;
  content: string;
  showFlag: ShowFlag;
  reportCount: number;
}

@Service()
export abstract class BaseBoardService<T extends BaseBoard> extends BaseService<
  T
> {
  constructor(repo: ObjectType<T>) {
    super(repo);
  }

  public async getBoardList(query?: string): Promise<BaseBoard[]> {
    let board_list;
    if (query) {
      board_list = await this.getByWhere(
        {
          where: [
            { title: Like(`%${query}%`) },
            { content: Like(`%${query}%`) }
          ]
        },
        ["user"]
      );
    } else {
      board_list = (await this.list(["user"])).filter(_ => _.deletedAt == null);
    }

    return _.sortBy(board_list, "createdAt");
  }
  public async updateReportCount(id: number): Promise<BaseBoard> {
    const board = await (<Promise<T>>this.getById(id));
    const newBoard: Partial<BaseBoard> = {
      reportCount: board.reportCount + 1
    };
    return this.genericRepository.save({ ...board, ...newBoard } as any);
  }

  public async changeShowType(id: number, type: ShowFlag): Promise<BaseBoard> {
    const board = await (<Promise<T>>this.getById(id));
    const newBoard: Partial<BaseBoard> = {};
    newBoard.showFlag = type;
    if (type == ShowFlag.DELETE) {
      //delete 는 showFlag의 delete 사용 ..
      newBoard.deletedAt = new Date();
    }
    return this.genericRepository.save({ ...board, ...newBoard } as any);
  }
}
