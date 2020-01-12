import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import { Container } from "typedi";
import { ParticipationService, UserService } from "../../services";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});
describe("Participation", () => {
  it("participate user", async () => {
    const participationService = Container.get(ParticipationService);
    const userService = Container.get(UserService);
    const user = await userService.getById(3);
    const participation = await participationService.save(user, 2);
    console.log(participation);
  });
  it("participate 검색", async () => {
    const participationService = Container.get(ParticipationService);
    console.log(await participationService.findByUser(3));
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
