import { Service } from "typedi";
import { BaseBoardService } from "./BaseBoardService";
import { IBoardDTO } from "./BaseBoardService";
import { Faq } from "../models";
import { ShowFlag } from "../models/Enum";

@Service()
export class FaqBoardService extends BaseBoardService<Faq> {
  constructor() {
    super(Faq);
  }

  public async save(board: Partial<IBoardDTO>): Promise<Faq> {
    return this.genericRepository.save({
      title: board.title,
      content: board.content,
      showFlag: ShowFlag["SHOW"]
    });
  }
}
