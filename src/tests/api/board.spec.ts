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

describe("board", () => {
  test("POST /board/direct", async () => {
    const res = await supertest(app)
      .post("/board/direct")
      .send({
        title: "테스트 릴리즈 글2 ",
        content: "안녕 나는 테스트~",
        location: "서울",
        hospital: "서울대병원",
        blood: "RH+O",
        donationKinds: "혈소판"
      })
      .set(
        "authorization",
        `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3ODY1MTUyNSwiZXhwIjoxNTc4NzM3OTI1fQ.KQzQcvK2h0Ggq-V8n9ZFIYtMpqBO3UqVkmmqWrB6gbnP71nLc0_WxI_lTUZyuAMC1e5lOTDNsXI67ozjo9W66A`
      );
    expect(res.status).toEqual(201);
  });
  test("DELETE /board/normal/:id", async () => {
    const res = await supertest(app)
      .delete("/board/normal/6")
      .set(
        "authorization",
        `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3ODY1MTUyNSwiZXhwIjoxNTc4NzM3OTI1fQ.KQzQcvK2h0Ggq-V8n9ZFIYtMpqBO3UqVkmmqWrB6gbnP71nLc0_WxI_lTUZyuAMC1e5lOTDNsXI67ozjo9W66A`
      );
    expect(res.status).toEqual(204);
  });

  test("DELETE /board/normal 실패케이스", async () => {
    const res = await supertest(app)
      .delete("/board/normal/abc")
      .set(
        "authorization",
        `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU3ODY1MTUyNSwiZXhwIjoxNTc4NzM3OTI1fQ.KQzQcvK2h0Ggq-V8n9ZFIYtMpqBO3UqVkmmqWrB6gbnP71nLc0_WxI_lTUZyuAMC1e5lOTDNsXI67ozjo9W66A`
      );
    expect(res.status).toEqual(204);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
