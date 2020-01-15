import {
  JsonController,
  Post,
  CurrentUser,
  Body,
  Put,
  UnauthorizedError,
  Get,
  Req,
  NotAcceptableError,
  Param,
  Delete
} from "routing-controllers";
import { BaseCommentController } from "./BaseCommentController";
import { NormalBoardComment, User } from "../models";
import { NormalBoardCommentService, ApiLogService } from "../services";
import { ICommentDTO } from "../services/BaseCommentService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import Container from "typedi";
import express from "express";

@JsonController("/normal_board_comment")
export class NormalBoardCommentController extends BaseCommentController<
  NormalBoardComment,
  NormalBoardCommentService
> {
  constructor(private normalBoardCommentService: NormalBoardCommentService) {
    super(normalBoardCommentService);
  }

  @Post()
  @OpenAPI({
    summary: "save normalBoardComment",
    description: " comment: string; boardId: number; user: User;",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(NormalBoardComment, {
    isArray: false,
    statusCode: "201"
  })
  public async save(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<ICommentDTO, "comment" | "boardId">
  ) {
    return await this.normalBoardCommentService.save({
      comment: body.comment,
      boardId: body.boardId,
      user: user
    });
  }

  @Put("/:comment_id")
  @OpenAPI({
    summary: "edit normalBoardComment",
    description: " comment: string; boardId: number; user: User;",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(NormalBoardComment, {
    isArray: false,
    statusCode: "201"
  })
  public async updateComment(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<ICommentDTO, "comment">,
    @Param("comment_id") id: number
  ): Promise<NormalBoardComment> {
    const oldComment = await this.normalBoardCommentService.getById(id, [
      "user"
    ]);
    if (oldComment.user.id != user.id)
      throw new UnauthorizedError("권한이 없습니다.");
    return (await this.update(id, body.comment)) as any;
  }

  @Get("/report/:comment_id")
  @OpenAPI({
    summary: "report normalBoardComment",
    description: "",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(NormalBoardComment, {
    isArray: false,
    statusCode: "201"
  })
  public async reportComment(
    @CurrentUser({ required: true }) user: User,
    @Param("comment_id") commentId: number,
    @Req()
    request: express.Request
  ): Promise<any> {
    const apiLogService = Container.get(ApiLogService);
    const url = `${request.method}|${request.url}`;

    const log = await apiLogService.getByWhere({ user: user, log: url });
    if (log.length != 0) throw new NotAcceptableError("이미 신고하셨습니다.");

    return (await this.updateReport(commentId)) as any;
  }

  @Delete("/:comment_id")
  @OpenAPI({
    summary: "report normalBoardComment",
    description: "",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(NormalBoardComment, {
    isArray: false,
    statusCode: "201"
  })
  public async deleteComment(
    @CurrentUser({ required: true }) user: User,
    @Param("comment_id") commentId: number
  ) {
    const oldComment = await this.normalBoardCommentService.getById(commentId, [
      "user",
      "depthComments"
    ]);
    if (oldComment.user.id != user.id)
      throw new UnauthorizedError("권한이 없습니다.");
    else if (oldComment.depthComments.length != 0) {
      return this.update(commentId, "[삭제된 메세지 입니다.]");
    }
    return this.delete(commentId);
  }
}
