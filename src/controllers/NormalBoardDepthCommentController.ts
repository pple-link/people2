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
import { User, NormalBoardDepthComment } from "../models";
import { ApiLogService, NormalBoardDepthCommentService } from "../services";
import { ICommentDTO } from "../services/BaseCommentService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import Container from "typedi";
import express from "express";

@JsonController("/normal_board_depth_comment")
export class NormalBoardDepthCommentController extends BaseCommentController<
  NormalBoardDepthComment,
  NormalBoardDepthCommentService
> {
  constructor(
    private normalBoardDepthCommentService: NormalBoardDepthCommentService
  ) {
    super(normalBoardDepthCommentService);
  }

  @Post("/:comment_id")
  @OpenAPI({
    summary: "save normalBoardDepthComment",
    description: " comment: string; commentId: number; user: User;",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(NormalBoardDepthComment, {
    isArray: false,
    statusCode: "201"
  })
  public async save(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<ICommentDTO, "comment">,
    @Param("comment_id") commentId: number
  ) {
    return await this.normalBoardDepthCommentService.createOrUpdate({
      comment: body.comment,
      commentId: commentId,
      user: user
    });
  }

  @Put("/:depth_comment_id")
  @OpenAPI({
    summary: "edit normalBoardComment",
    description: " comment: string; boardId: number; user: User;",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(NormalBoardDepthComment, {
    isArray: false,
    statusCode: "201"
  })
  public async updateComment(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<ICommentDTO, "comment">,
    @Param("depth_comment_id") id: number
  ) {
    const oldComment = await this.normalBoardDepthCommentService.getById(id, [
      "user"
    ]);
    if (oldComment.user.id != user.id)
      throw new UnauthorizedError("권한이 없습니다.");
    return await this.update(id, body.comment);
  }

  @Get("/report/:depth_comment_id")
  @OpenAPI({
    summary: "report normalBoardComment",
    description: "",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(NormalBoardDepthComment, {
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
    summary: "report normalBoardComment",
    description: "",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(NormalBoardDepthComment, {
    isArray: false,
    statusCode: "201"
  })
  public async deleteComment(
    @CurrentUser({ required: true }) user: User,
    @Param("depth_comment_id") commentId: number
  ) {
    const oldComment = await this.normalBoardDepthCommentService.getById(
      commentId,
      ["user", "depthComments"]
    );
    if (oldComment.user.id != user.id)
      throw new UnauthorizedError("권한이 없습니다.");
    return this.delete(commentId);
  }
}
