import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import { Container } from "typedi";
import {
  ParticipationBoardService,
  UserService,
  ParticipationService
} from "../../services";
import { ShowFlag } from "../../models/Enum";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});
describe("Participation", () => {
  it("participate Board 응원메시지", async () => {
    const participationBoardService = Container.get(ParticipationBoardService);
    const userService = Container.get(UserService);
    const user = await userService.getById(2);
    const participationService = Container.get(ParticipationService);
    const participation = await participationService.getById(6);
    const participationBoard = await participationBoardService.save({
      title: "안녕하세요 화이팅",
      content: "이번주 토요일에 헌혈하러갑니다.",
      showFlag: ShowFlag["PENDING"],
      user: user,
      participation: participation
    });
    console.log(participationBoard);
    delete participationBoard.id;
    delete participationBoard.createdAt;
    delete participationBoard.updatedAt;
    delete participationBoard.reportCount;
    delete participationBoard.comments;
    delete participationBoard.deletedAt;
    expect(participationBoard).toEqual({
      title: "안녕하세요 화이팅",
      content: "이번주 토요일에 헌혈하러갑니다.",
      showFlag: ShowFlag["PENDING"],
      user: user,
      participation: participation
    });
  });
  it("participation Board 검색", async () => {
    const participationService = new ParticipationBoardService();
    console.log(await participationService.findByUser(3));
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
