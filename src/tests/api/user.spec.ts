import supertest from "supertest";
import { app } from "../../server";
import { QueryRunner } from "typeorm";
import { connectDatabase } from "../../database";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});

describe("user", () => {
  test("GET /user", async () => {
    const res = await supertest(app)
      .get("/user")
      .set("authorization", String(process.env.TEST_TOKEN));
    expect(res.status).toBeGreaterThanOrEqual(200);
  });
  test("POST /edit", async () => {
    const res = await supertest(app)
      .post("/user/edit")
      .send({
        nickname: "안녕나는재규"
      })
      .set("authorization", String(process.env.TEST_TOKEN));
    expect(res.status).toBeGreaterThanOrEqual(201);
  });
  test("POST /delete", async () => {
    const res = await supertest(app)
      .post("/user/delete")
      .set("authorization", String(process.env.TEST_TOKEN));
    expect(res.status).toBeGreaterThanOrEqual(204);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
