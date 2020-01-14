import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import { DirectBoardService, UserAccountService } from "../../services";
import { Container } from "typedi";
import { ShowFlag, Location, Blood, DonationKind } from "../../models/Enum";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});

describe("BoardService", () => {
  it("new DirectBoard", async () => {
    const directBoardService = Container.get(DirectBoardService);
    const userAccountService = Container.get(UserAccountService);
    const userAccount = await userAccountService.getByClientId("123");
    const directBoard = await directBoardService.save({
      title: "테스트 게시글",
      content: "안녕하세요 첫 글이에요~",
      user: userAccount.user,
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
      user: userAccount.user,
      reportCount: 0,
      location: Location["SEOUL"],
      hospital: "서울대병원",
      blood: Blood["RHPO"],
      donationKinds: `[${DonationKind["HYEOLSOPAN"]},${DonationKind["ALL"]}]`
    });
  });
  it("get Board by user", async () => {
    const directBoardService = Container.get(DirectBoardService);
    const userAccountService = Container.get(UserAccountService);
    const user = await userAccountService.getByClientId("123");
    const directBoard = await directBoardService.getByUserId(user!.id);
    console.log("direct board", directBoard);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
