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
import { User, DirectBoardDepthComment } from "../models";
import { ApiLogService, DirectBoardDepthCommentService } from "../services";
import { ICommentDTO } from "../services/BaseCommentService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import Container from "typedi";
import express from "express";

@JsonController("/direct_board_depth_comment")
export class DirectBoardDepthCommentController extends BaseCommentController<
  DirectBoardDepthComment,
  DirectBoardDepthCommentService
> {
  constructor(
    private directBoardDepthCommentService: DirectBoardDepthCommentService
  ) {
    super(directBoardDepthCommentService);
  }

  @Post("/:comment_id")
  @OpenAPI({
    summary: "save directBoardDepthComment",
    description: " comment: string; commentId: number; user: User;",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(DirectBoardDepthComment, {
    isArray: false,
    statusCode: "201"
  })
  public async save(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<ICommentDTO, "comment">,
    @Param("comment_id") commentId: number
  ) {
    return await this.directBoardDepthCommentService.createOrUpdate({
      comment: body.comment,
      commentId: commentId,
      user: user
    });
  }

  @Put("/:depth_comment_id")
  @OpenAPI({
    summary: "edit directBoardComment",
    description: " comment: string; boardId: number; user: User;",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(DirectBoardDepthComment, {
    isArray: false,
    statusCode: "201"
  })
  public async updateComment(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<ICommentDTO, "comment">,
    @Param("depth_comment_id") id: number
  ) {
    const oldComment = await this.directBoardDepthCommentService.getById(id, [
      "user"
    ]);
    if (oldComment.user.id != user.id)
      throw new UnauthorizedError("권한이 없습니다.");
    return await this.update(id, body.comment);
  }

  @Get("/report/:depth_comment_id")
  @OpenAPI({
    summary: "report directBoardComment",
    description: "",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(DirectBoardDepthComment, {
    isArray: false,
    statusCode: "201"
  })
  public async reportComment(
    @CurrentUser({ required: true }) user: User,
    @Param("depth_comment_id") commentId: number,
    @Req()
    request: express.Request
  ) {
    const apiLogService = Container.get(ApiLogService);
    const url = `${request.method}|${request.url}`;

    const log = await apiLogService.getByWhere({ user: user, log: url });
    if (log.length != 0) throw new NotAcceptableError("이미 신고하셨습니다.");

    return await this.updateReport(commentId);
  }

  @Delete("/:depth_comment_id")
  @OpenAPI({
    summary: "report directBoardComment",
    description: "",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(DirectBoardDepthComment, {
    isArray: false,
    statusCode: "201"
  })
  public async deleteComment(
    @CurrentUser({ required: true }) user: User,
    @Param("depth_comment_id") commentId: number
  ) {
    const oldComment = await this.directBoardDepthCommentService.getById(
      commentId,
      ["user", "depthComments"]
    );
    if (oldComment.user.id != user.id)
      throw new UnauthorizedError("권한이 없습니다.");
    return this.delete(commentId);
  }
}
