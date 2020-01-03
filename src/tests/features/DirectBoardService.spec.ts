import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import {
  DirectBoardService,
  UserService,
  UserAccountService
} from "../../services";
import { ShowFlag, Location, Blood, DonationKind } from "../../models/Enum";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});

describe("BoardService", () => {
  it("new DirectBoard", async () => {
    const directBoardService = new DirectBoardService();
    const userService = new UserService(new UserAccountService());
    const user = await userService.getByClientId("123");
    const directBoard = await directBoardService.save({
      title: "테스트 게시글",
      content: "안녕하세요 첫 글이에요~",
      user: user,
      location: Location["SEOUL"],
      hospital: "서울대병원",
      blood: Blood["RHPO"],
      donationKinds: `[${DonationKind["HYEOLSOPAN"]},${DonationKind["ALL"]}]`
    });
    delete directBoard.id;
    delete directBoard.createdAt;
    delete directBoard.updatedAt;
    delete directBoard.deletedAt;
    expect(directBoard).toEqual({
      title: "테스트 게시글",
      content: "안녕하세요 첫 글이에요~",
      showFlag: ShowFlag["PENDING"],
      user: user,
      reportCount: 0,
      location: Location["SEOUL"],
      hospital: "서울대병원",
      blood: Blood["RHPO"],
      donationKinds: `[${DonationKind["HYEOLSOPAN"]},${DonationKind["ALL"]}]`
    });
  });
  it("get Board by user", async () => {
    const boardService = new DirectBoardService();
    const userService = new UserService(new UserAccountService());
    const user = await userService.getByClientId("123");
    const directBoard = await boardService.getByUserId(user!.id);
    console.log("direct board", directBoard);
  });
});
