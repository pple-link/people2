import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import {
  ParticipationService,
  UserService,
  UserAccountService,
  DirectBoardService
} from "../../services";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});
describe("Participation", () => {
  it("participate user", async () => {
    const participationService = new ParticipationService(
      new UserService(new UserAccountService()),
      new DirectBoardService()
    );

    const participation = await participationService.save(3, 2);
    console.log(participation);
  });
  it("participate 검색", async () => {
    const participationService = new ParticipationService(
      new UserService(new UserAccountService()),
      new DirectBoardService()
    );
    console.log(await participationService.findByUser(3));
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
