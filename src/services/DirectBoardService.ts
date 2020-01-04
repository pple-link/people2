import { Service } from "typedi";
import { IBoardDTO, BaseBoardService } from "./BaseBoardService";
import { ShowFlag, Blood, Location } from "../models/Enum";
import { DirectBoard, DirectBoardComment, User } from "../models";

export interface IDirectBoardDTO extends IBoardDTO {
  user: User;
  comments: DirectBoardComment[];
  location: Location;
  hospital: string;
  blood: Blood;
  donationKinds: string;
}

@Service()
export class DirectBoardService extends BaseBoardService<DirectBoard> {
  constructor() {
    super(DirectBoard);
  }

  public async save(board: Partial<IDirectBoardDTO>): Promise<DirectBoard> {
    return this.genericRepository.save({
      title: board.title,
      content: board.content,
      showFlag: ShowFlag["PENDING"],
      user: board.user!,
      location: board.location!,
      hospital: board.hospital!,
      blood: board.blood!,
      donationKinds: board.donationKinds!,
      crawlLog: [],
      participation: [],
      comments: []
    });
  }

  public async getByUserId(userId: number) {
    return this.genericRepository.find({
      where: { user: userId },
      relations: [/*"directBoardComments"*/ "user"]
    });
  }
}
