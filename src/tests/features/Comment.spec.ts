import { connectDatabase } from "../../database";
import { QueryRunner, DeleteResult } from "typeorm";
import { Container } from "typedi";
import {
  NormalBoardCommentService,
  NormalBoardDepthCommentService
} from "../../services";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});
describe("댓글 달기, 수정", () => {
  it("new comment", async () => {
    const normalBoardCommentService = Container.get(NormalBoardCommentService);
    const comment = await normalBoardCommentService.createOrUpdate({
      comment: "힘내세요 화이팅!!",
      boardId: 1,
      userId: 3
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
    const deleteComment: DeleteResult = await normalBoardCommentService.delete(
      2
    );
    console.log(deleteComment);
  });

  it("updateReportCount normalBoardComment", async () => {
    const normalBoardCommentService = Container.get(NormalBoardCommentService);
    const comment = await normalBoardCommentService.getById(3);
    if (comment) {
      const reportComment = await normalBoardCommentService.updateReportCount(
        3
      );
      comment.reportCount = comment.reportCount + 1;

      expect(comment.reportCount).toEqual(reportComment.reportCount);
    } else {
    }
  });

  it("대댓글 달기", async () => {
    const normalBoardDepthCommentService = Container.get(
      NormalBoardDepthCommentService
    );
    const normalBoardDepthComment = await normalBoardDepthCommentService.createOrUpdate(
      {
        comment: "저도 힘낼게요!",
        commentId: 3,
        userId: 3
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
