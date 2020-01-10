import "../../utils/env";
import { Authentication } from "../../utils/Authenticate";
import { Container } from "typedi";
import { UserService } from "../../services";
import { QueryRunner } from "typeorm";
import { connectDatabase } from "../../database";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});

describe("Authenticate", () => {
  it("generateToken", async () => {
    const userService = Container.get(UserService);
    const jwt = Authentication.generateToken(3);
    const flag = Authentication.verifyToekn(jwt);
    if (flag) {
      const decodeJwt = Authentication.getToken(jwt);
      const user = await userService.getById(3);
      expect(decodeJwt.userId).toEqual(user.id);
    } else {
      expect(flag).toEqual(false);
    }
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
