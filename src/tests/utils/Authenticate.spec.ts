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
    const jwt = Authentication.generateToken(1);
    const decodeJwt = Authentication.verifyToekn(jwt);
    expect(decodeJwt.userId).toEqual;
  });
  it("verifyToken", async () => {
    const userService = Container.get(UserService);
    const jwt = Authentication.generateToken(3);
    const decodeJwt = Authentication.verifyToekn(jwt);
    expect(decodeJwt.iat * 1000 - new Date().getTime()).toBeLessThan(0);
    expect(decodeJwt.exp * 1000 - new Date().getTime()).toBeGreaterThan(0);
    const user = await userService.getById(3);
    expect(decodeJwt.userId).toEqual(user.id);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
