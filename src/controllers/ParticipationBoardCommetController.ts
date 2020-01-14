import {
  JsonController,
  Post,
  HeaderParam,
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
import { ParticipationBoardComment, User } from "../models";
import { ParticipationBoardCommentService, ApiLogService } from "../services";
import { ICommentDTO } from "../services/BaseCommentService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import Container from "typedi";
import express from "express";

@JsonController("/participation_board_comment")
export class ParticipationBoardCommentController extends BaseCommentController<
  ParticipationBoardComment,
  ParticipationBoardCommentService
> {
  constructor(
    private participationBoardCommentService: ParticipationBoardCommentService
  ) {
    super(participationBoardCommentService);
  }

  @Post()
  @OpenAPI({
    summary: "save participationBoardComment",
    description: " comment: string; boardId: number; user: User;"
  })
  @ResponseSchema(ParticipationBoardComment, {
    isArray: false,
    statusCode: "201"
  })
  @HeaderParam("authorization")
  public async save(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<ICommentDTO, "comment" | "boardId">
  ) {
    return await this.participationBoardCommentService.save({
      comment: body.comment,
      boardId: body.boardId,
      user: user
    });
  }

  @Put("/:comment_id")
  @OpenAPI({
    summary: "edit participationBoardComment",
    description: " comment: string; boardId: number; user: User;"
  })
  @ResponseSchema(ParticipationBoardComment, {
    isArray: false,
    statusCode: "201"
  })
  @HeaderParam("authorization")
  public async updateComment(
    @CurrentUser({ required: true }) user: User,
    @Body() body: Pick<ICommentDTO, "comment">,
    @Param("comment_id") id: number
  ): Promise<ParticipationBoardComment> {
    const oldComment = await this.participationBoardCommentService.getById(id, [
      "user"
    ]);
    if (oldComment.user.id != user.id)
      throw new UnauthorizedError("권한이 없습니다.");
    return (await this.update(id, body.comment)) as any;
  }

  @Get("/report/:comment_id")
  @OpenAPI({
    summary: "report participationBoardComment",
    description: ""
  })
  @ResponseSchema(ParticipationBoardComment, {
    isArray: false,
    statusCode: "201"
  })
  @HeaderParam("authorization")
  public async reportComment(
    @CurrentUser({ required: true }) user: User,
    @Param("comment_id") commentId: number,
    @Req()
    request: express.Request
  ): Promise<any> {
    const apiLogService = Container.get(ApiLogService);
    const url = `${request.method}|${request.url}`;

    const log = await apiLogService.getByWhere({ user: user, log: url });
    console.log(log);
    if (log.length != 0) throw new NotAcceptableError("이미 신고하셨습니다.");

    return (await this.updateReport(commentId)) as any;
  }

  @Delete("/:comment_id")
  @OpenAPI({
    summary: "report participationBoardComment",
    description: ""
  })
  @ResponseSchema(ParticipationBoardComment, {
    isArray: false,
    statusCode: "201"
  })
  @HeaderParam("authorization")
  public async deleteComment(
    @CurrentUser({ required: true }) user: User,
    @Param("comment_id") commentId: number
  ) {
    const oldComment = await this.participationBoardCommentService.getById(
      commentId,
      ["user", "depthComments"]
    );
    if (oldComment.user.id != user.id)
      throw new UnauthorizedError("권한이 없습니다.");
    return this.delete(commentId);
  }
}
