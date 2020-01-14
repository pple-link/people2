import { connectDatabase } from "../../database";
import { QueryRunner, DeleteResult } from "typeorm";
import { Container } from "typedi";
import {
  NormalBoardCommentService,
  NormalBoardDepthCommentService,
  DirectBoardCommentService,
  DirectBoardDepthCommentService,
  UserService
} from "../../services";
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});
describe("댓글 달기, 수정", () => {
  it("new  normal comment", async () => {
    const normalBoardCommentService = Container.get(NormalBoardCommentService);
    const userService = Container.get(UserService);
    const user = await userService.getById(3);
    const comment = await normalBoardCommentService.save({
      comment: "힘내세요 화이팅!!",
      boardId: 1,
      user: user
    });
    delete comment.id;
    delete comment.createdAt;
    delete comment.updatedAt;
    delete comment.reportCount;
    delete comment.normalBoard;
    delete comment.user;
    expect(comment).toEqual({ comment: "힘내세요 화이팅!!" });
  });

  it("new direct comment", async () => {
    const directBoardCommentService = Container.get(DirectBoardCommentService);
    const userService = Container.get(UserService);
    const user = await userService.getById(3);
    const comment = await directBoardCommentService.save({
      comment: "힘내세요 화이팅!!",
      boardId: 2,
      user: user
    });
    delete comment.id;
    delete comment.createdAt;
    delete comment.updatedAt;
    delete comment.reportCount;
    delete comment.directBoard;
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

  it("normal 대댓글 달기", async () => {
    const normalBoardDepthCommentService = Container.get(
      NormalBoardDepthCommentService
    );
    const userService = Container.get(UserService);
    const user = await userService.getById(3);
    const normalBoardDepthComment = await normalBoardDepthCommentService.createOrUpdate(
      {
        comment: "저도 힘낼게요!",
        commentId: 13,
        user: user
      }
    );
    console.log(normalBoardDepthComment);
  });

  it("direct 대댓글 달기", async () => {
    const directBoardDepthCommentService = Container.get(
      DirectBoardDepthCommentService
    );
    const userService = Container.get(UserService);
    const user = await userService.getById(3);
    const directBoardDepthComment = await directBoardDepthCommentService.createOrUpdate(
      {
        comment: "저도 힘낼게요!",
        commentId: 1,
        user: user
      }
    );
    console.log(directBoardDepthComment);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
