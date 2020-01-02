import { Service } from "typedi";
import { getConnection, Repository } from "typeorm";
import { BaseService } from "./BaseService";
import { ShowFlag } from "../models/Enum";
import { BaseBoard } from "../models/BaseBoard";

export interface IBoardDTO {
  title: string;
  content: string;
  showFlag: ShowFlag;
  reportCount: number;
}

export type ObjectType<T> = { new (): T } | Function;

@Service()
export class BaseBoardService<T extends BaseBoard> extends BaseService {
  protected genericRepository: Repository<T>;

  constructor(repo: ObjectType<T>) {
    super();
    this.genericRepository = getConnection().getRepository(repo);
  }

  public async list(): Promise<T[]> {
    const result: T[] = await (<Promise<T[]>>this.genericRepository.find());
    return result;
  }

  public async getById(id: number): Promise<BaseBoard> {
    return await (<Promise<BaseBoard>>(
      this.genericRepository.findOne({ where: { id: id } })
    ));
  }

  public async updateReportCount(id: number): Promise<BaseBoard> {
    const board = await (<Promise<T>>this.getById(id));
    const newBoard: Partial<BaseBoard> = {
      reportCount: board.reportCount + 1
    };
    // any 말고 뭐써야돼?..
    return this.genericRepository.save({ ...board, ...newBoard } as any);
  }

  public async changeShowType(id: number, type: ShowFlag): Promise<BaseBoard> {
    const board = await (<Promise<T>>this.getById(id));
    const newBoard: Partial<BaseBoard> = {};
    newBoard.showFlag = type;
    // 여기도..
    if (type == ShowFlag.DELETE) {
      //delete 는 showFlag의 delete 사용 ..
      newBoard.deletedAt = new Date();
    }
    return this.genericRepository.save({ ...board, ...newBoard } as any);
  }
}
