import { connectDatabase } from "../../database";
import { QueryRunner } from "typeorm";
import { Container } from "typedi";
import {
  NormalBoardCommentService,
  NormalBoardDepthCommentService,
  UserService,
  NormalBoardService
} from "../../services";
import { ShowFlag } from "../../models/Enum";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});
describe("댓글 달기, 수정", () => {
  it("new comment", async () => {
    const normalBoardCommentService = Container.get(NormalBoardCommentService);
    const userService = Container.get(UserService);
    const boardService = Container.get(NormalBoardService);
    const user = await userService.getByClientId("123");
    const normalBoard = await boardService.getByUserId(user!.id);
    const comment = await normalBoardCommentService.createOrUpdate({
      normalBoard: normalBoard,
      user: user,
      comment: "힘내세요 화이팅!!"
    });
    delete comment.id;
    delete comment.createdAt;
    delete comment.updatedAt;
    delete comment.reportCount;
    delete comment.normalBoard;
    delete comment.user;
    expect(comment).toEqual({ comment: "힘내세요 화이팅!!" });
  });
  it("댓글 삭제", async () => {
    const normalBoardCommentService = Container.get(NormalBoardCommentService);
    const deleteComment = await normalBoardCommentService.delete(1);
    expect(typeof deleteComment.deletedAt).toEqual(Date);
  });

  it("updateReportCount ", async () => {
    const normalBoardCommentService = Container.get(NormalBoardCommentService);
    const comment = await normalBoardCommentService.getById(1);
    const reportComment = await normalBoardCommentService.updateReportCount(1);
    comment.reportCount = comment.reportCount + 1;
    expect(comment.reportCount).toEqual(reportComment.reportCount);
  });

  it("대댓글 달기", async () => {
    const normalBoardDepthCommentService = Container.get(
      NormalBoardDepthCommentService
    );
    const normalBoardCommentService = Container.get(NormalBoardCommentService);
    const normalBoardComment = await normalBoardCommentService.getById(1);
    const userService = Container.get(UserService);
    const user = await userService.getByClientId("123");
    const normalBoardDepthComment = await normalBoardDepthCommentService.createOrUpdate(
      {
        normalBoardComment: normalBoardComment,
        user: user,
        comment: "힘내세요 화이팅2222!!"
      }
    );
    console.log(normalBoardDepthComment);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
