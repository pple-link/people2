import {
  JsonController,
  Get,
  Param,
  NotFoundError,
  HttpCode,
  InternalServerError,
  UseInterceptor
} from "routing-controllers";
import { BaseController } from "./BaseController";
import {
  NormalBoardService,
  DirectBoardService,
  NormalBoardDepthCommentService,
  DirectBoardDepthCommentService
} from "../services";
import { ResponseSchema } from "routing-controllers-openapi";
import { NormalBoard, DirectBoard } from "../models";
import { ResponseJosnInterceptor } from "../interceptors/ResponseJsonInterceptor";

@JsonController("/board")
@UseInterceptor(ResponseJosnInterceptor)
export class BoardController extends BaseController {
  constructor(
    private normalBoardService: NormalBoardService,
    private directBoardService: DirectBoardService,
    private normalBoardDepthCommentService: NormalBoardDepthCommentService,
    private directBoardDepthCommentService: DirectBoardDepthCommentService
  ) {
    super();
  }
  @HttpCode(200)
  @Get("/normal")
  @ResponseSchema(NormalBoard, {
    description: "A list of normalBoard objects",
    isArray: true,
    statusCode: "200"
  })
  public async normalBoardList() {
    try {
      const board_list = (await this.normalBoardService.list(["user"])).filter(
        _ => _.deletedAt == null
      );
      return board_list;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  @HttpCode(200)
  @ResponseSchema(NormalBoard, {
    description: "get normalBoard by id",
    isArray: false,
    statusCode: "200"
  })
  @Get("/normal/:id")
  public async getNormalBoard(@Param("id") id: number) {
    const board = await this.normalBoardService.getById(id, [
      "user",
      "comments",
      "comments.user"
    ]);
    if (board === undefined) {
      throw new NotFoundError(`can not get normal board id ${id}`);
    }
    const comment = board.comments;
    const commentsAddDepth = await Promise.all(
      comment.map(async _ => {
        const depthComment = await this.normalBoardDepthCommentService.getByWhere(
          { ref: _.id },
          ["user"]
        );
        _.depthComments = depthComment;

        return _;
      })
    );
    board.comments = commentsAddDepth;
    return board;
  }

  @HttpCode(200)
  @Get("/direct")
  @ResponseSchema(DirectBoard, {
    description: "a list of directBoard Objects",
    isArray: true,
    statusCode: "200"
  })
  public async directBoardList() {
    try {
      const board_list = (await this.directBoardService.list(["user"])).filter(
        _ => _.deletedAt == null
      );
      return board_list;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  @HttpCode(200)
  @Get("/direct/:id")
  @ResponseSchema(DirectBoard, {
    description: "get normalBoard by id",
    isArray: false,
    statusCode: "200"
  })
  public async getDirectBoard(@Param("id") id: number) {
    const board = await this.directBoardService.getById(id, [
      "user",
      "comments",
      "comments.user"
    ]);
    if (board === undefined) {
      throw new NotFoundError(`can not get direct board id ${id}`);
    }
    const comment = board.comments;
    const commentsAddDepth = await Promise.all(
      comment.map(async _ => {
        const depthComment = await this.directBoardDepthCommentService.getByWhere(
          { ref: _.id },
          ["user"]
        );
        _.depthComments = depthComment;

        return _;
      })
    );
    board.comments = commentsAddDepth;
    return board;
  }
}
