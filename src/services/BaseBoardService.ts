import { Service } from "typedi";
import { BaseService, ObjectType, listForm } from "./BaseService";
import { ShowFlag } from "../models/Enum";
import { BaseBoard } from "../models/BaseBoard";
import { Like, IsNull } from "typeorm";

export interface IBoardDTO {
  title: string;
  content: string;
  showFlag: ShowFlag;
  reportCount: number;
}

const listForm = Promise;

@Service()
export abstract class BaseBoardService<T extends BaseBoard> extends BaseService<
  T
> {
  constructor(repo: ObjectType<T>) {
    super(repo);
  }

  public async getBoardList(page: number, query?: string): listForm<T> {
    if (Number.isNaN(page) || page === undefined) {
      page = 1;
    }
    const size = 10;
    const begin = (page - 1) * size;

    let board_list;
    if (query) {
      board_list = await this.getByWhere(
        [
          {
            title: Like(`%${query}%`),
            deletedAt: IsNull(),
            showFlag: ShowFlag["SHOW"]
          },
          {
            content: Like(`%${query}%`),
            deletedAt: IsNull(),
            showFlag: ShowFlag["SHOW"]
          }
        ],
        ["user"],
        begin,
        size
      );
    } else {
      board_list = await this.list(["user"], begin, size);
    }

    return { array: board_list[0], total: board_list[1] };
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
