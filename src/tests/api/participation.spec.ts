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

describe("participation", () => {
  test("POST /participate/:direct-board-id", async () => {
    const res = await supertest(app)
      .post("/participate/2")
      .set(
        "authorization",
        `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE1Nzg4MDk3NTgsImV4cCI6MTU3ODg5NjE1OH0.sPoy9ZOvpwNYoi511PJFfAXv1p1IKdfws22JpgKOOLdmXH7SKjwBT1Q1CuURxRKyWfoUOaqwmUWMPTU4rqKiGg`
      );
    expect(res.status).toEqual(201);
  });
  test("POST /participate/:participation_id/board", async () => {
    const res = await supertest(app)
      .post("/participate/18/board")
      .send({
        title: "안녕하세요 낼 할게요",
        content: "안녕 본문이에요."
      })
      .set(
        "authorization",
        `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE1Nzg4MDk3NTgsImV4cCI6MTU3ODg5NjE1OH0.sPoy9ZOvpwNYoi511PJFfAXv1p1IKdfws22JpgKOOLdmXH7SKjwBT1Q1CuURxRKyWfoUOaqwmUWMPTU4rqKiGg`
      );
    console.log(res.text);
    expect(res.status).toEqual(201);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
