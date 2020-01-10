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
      .set(
        "authorization",
        `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3ODY1MTUyNSwiZXhwIjoxNTc4NzM3OTI1fQ.KQzQcvK2h0Ggq-V8n9ZFIYtMpqBO3UqVkmmqWrB6gbnP71nLc0_WxI_lTUZyuAMC1e5lOTDNsXI67ozjo9W66A`
      );
    console.log(res.text);
    expect(res.status).toBeGreaterThanOrEqual(200);
  });
  test("POST /edit", async () => {
    const res = await supertest(app)
      .post("/user/edit")
      .send({
        nickname: "안녕나는재규"
      })
      .set(
        "authorization",
        `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3ODY1MTUyNSwiZXhwIjoxNTc4NzM3OTI1fQ.KQzQcvK2h0Ggq-V8n9ZFIYtMpqBO3UqVkmmqWrB6gbnP71nLc0_WxI_lTUZyuAMC1e5lOTDNsXI67ozjo9W66A`
      );
    console.log(res.text);
  });
  test("POST /delete", async () => {
    const res = await supertest(app)
      .post("/user/delete")
      .set(
        "authorization",
        `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3ODY1MTUyNSwiZXhwIjoxNTc4NzM3OTI1fQ.KQzQcvK2h0Ggq-V8n9ZFIYtMpqBO3UqVkmmqWrB6gbnP71nLc0_WxI_lTUZyuAMC1e5lOTDNsXI67ozjo9W66A`
      );
    console.log(res.text);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
