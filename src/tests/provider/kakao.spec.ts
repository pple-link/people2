import "../../utils/env";
import { QueryRunner } from "typeorm";
import { connectDatabase } from "../../database";
import { KaKaoProvider } from "../../providers/KakaoProvider";
import Container from "typedi";
import { Authentication } from "../../utils/Authenticate";
import { UserAccountService } from "../../services";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});

describe("Authenticate", () => {
  it("generateToken", async () => {
    const clientToken =
      "PrHGn1KycTZAfWibiYK3PiWf2Py9DbLMB91F5QopdbMAAAFvjmvoQA";
    const kakaoProvider = new KaKaoProvider();

    const clientId = await kakaoProvider.getClient_id(clientToken);
    const userAccountService = Container.get(UserAccountService);
    const userAccount = await userAccountService.getByClientId(clientId);
    const jwt = await kakaoProvider.generateToken(userAccount.user!.id);
    expect(Authentication.verifyToken(jwt)).toEqual(true);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
