import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import { Container } from "typedi";
import { ParticipationService } from "../../services";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});
describe("Participation", () => {
  it("participate user", async () => {
    const participationService = Container.get(ParticipationService);
    const participation = await participationService.save(3, 2);
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
