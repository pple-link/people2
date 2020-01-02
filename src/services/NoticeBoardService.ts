import { Service } from "typedi";
import { BaseBoardService } from "./BaseBoardService";
import { IBoardDTO } from "./BaseBoardService";
import { Notice } from "../models";
import { ShowFlag } from "../models/Enum";

export type ObjectType<T> = { new (): T } | Function;

@Service()
export class NoticeBoardService extends BaseBoardService<Notice> {
  constructor() {
    super(Notice);
  }

  public async save(board: Partial<IBoardDTO>): Promise<Notice> {
    return this.genericRepository.save({
      title: board.title,
      content: board.content,
      showFlag: ShowFlag["SHOW"]
    });
  }
}
