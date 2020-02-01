import {
  JsonController,
  Get,
  Param,
  NotFoundError,
  HttpCode,
  InternalServerError,
  UseInterceptor,
  Post,
  Body,
  CurrentUser,
  Delete,
  UnauthorizedError,
  QueryParam
} from "routing-controllers";
import { BaseController } from "./BaseController";
import {
  NormalBoardService,
  DirectBoardService,
  FaqBoardService,
  NoticeBoardService
} from "../services";
import { ResponseSchema, OpenAPI } from "routing-controllers-openapi";
import { NormalBoard, DirectBoard, User } from "../models";
import { ResponseJosnInterceptor } from "../interceptors/ResponseJsonInterceptor";
// import { INormalBoardDTO } from "../services/NormalBoardService";
import { ShowFlag, IsAdmin } from "../models/Enum";
// import { IDirectBoardDTO } from "../services/DirectBoardService";
import { apiClient } from "../utils/apiClient";
import { BaseBoard } from "../models/BaseBoard";
import { IBoardDTOClass, IDirectBoardDTOClass } from "../dto/BoardDTO";

@JsonController("/board")
@UseInterceptor(ResponseJosnInterceptor)
export class BoardController extends BaseController {
  constructor(
    private normalBoardService: NormalBoardService,
    private directBoardService: DirectBoardService,
    private faqBoardService: FaqBoardService,
    private noticeBoardService: NoticeBoardService
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
  public async normalBoardList(
    @QueryParam("page") take: number,
    @QueryParam("query") query?: string
  ) {
    try {
      return await this.normalBoardService.getBoardList(take, query);
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
      "comments.user",
      "comments.depthComments",
      "comments.depthComments.user"
    ]);
    if (board === undefined) {
      throw new NotFoundError(`can not get normal board id ${id}`);
    }
    return board;
  }

  @Post("/normal")
  @HttpCode(201)
  @OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(NormalBoard, {
    description: "write normalBoard Body: title:string, content: string",
    isArray: false,
    statusCode: "201"
  })
  public async writeNormalBoard(
    @CurrentUser({ required: true }) user: User,
    @Body() body: IBoardDTOClass
  ) {
    const board = await this.normalBoardService.save({
      title: body.title,
      content: body.content,
      showFlag: ShowFlag["SHOW"],
      user: user
    });

    return board;
  }
  @HttpCode(204)
  @Delete("/normal/:id")
  @OpenAPI({
    security: [{ bearerAuth: [] }], // Applied to each method
    summary: "soft delete normal board",
    description:
      "return { result: true content:{}} or { result: false, content: {} } "
  })
  public async deleteNormalBoard(
    @Param("id") id: number,
    @CurrentUser() user: User
  ) {
    const board = await this.normalBoardService.getById(id);
    if (board.user.id != user.id) {
      throw new UnauthorizedError("삭제 권한이 없습니다.");
    }

    const deleteBoard = await this.normalBoardService.changeShowType(
      board.id,
      ShowFlag.DELETE
    );
    if (deleteBoard.deletedAt == null) {
      throw new InternalServerError("삭제되지 않았음");
    }
    return {};
  }

  @HttpCode(200)
  @Get("/direct")
  @ResponseSchema(DirectBoard, {
    description: "a list of directBoard Objects",
    isArray: true,
    statusCode: "200"
  })
  public async directBoardList(
    @QueryParam("page") page: number,
    @QueryParam("query") query?: string
  ) {
    try {
      return await this.directBoardService.getBoardList(page, query);
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
      "comments.user",
      "comments.depthComments",
      "comments.depthComments.user"
    ]);
    if (board === undefined) {
      throw new NotFoundError(`can not get direct board id ${id}`);
    }
    return board;
  }

  @Post("/direct")
  @HttpCode(201)
  @OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(DirectBoard, {
    description: "title, content,location, hospital, blood, donationKinds",
    isArray: false,
    statusCode: "201"
  })
  public async writedirectBoard(
    @CurrentUser({ required: true }) user: User,
    @Body()
    body: IDirectBoardDTOClass
  ) {
    const board = await this.directBoardService.save({
      title: body.title,
      content: body.content,
      user: user,
      location: body.location!,
      hospital: body.hospital!,
      blood: body.blood!,
      donationKinds: body.donationKinds!
    });

    const arr = [
      body.title,
      body.content,
      `게시글번호 : ${board.id}`,
      `비노출로 변경 : /pc ${board.id} 0`,
      `노출로 변경 : /pc ${board.id} 1`,
      `대기로 변경 : /pc ${board.id} 2`,
      `모집완료로 변경 : /pc ${board.id} 3`
    ];
    await apiClient(process.env.SLACK_BOT_UPLOAD!).post("", {
      text: arr.join("\n")
    });

    return board;
  }

  @HttpCode(204)
  @Delete("/direct/:id")
  @OpenAPI({
    security: [{ bearerAuth: [] }], // Applied to each method
    summary: "soft delete direct board",
    description:
      "return { result: true content:{}} or { result: false, content: {} } "
  })
  public async deleteDirectBoard(
    @Param("id") id: number,
    @CurrentUser() user: User
  ) {
    const board = await this.directBoardService.getById(id);
    if (board.user.id != user.id) {
      throw new UnauthorizedError("삭제 권한이 없습니다.");
    }

    const deleteBoard = await this.directBoardService.changeShowType(
      board.id,
      ShowFlag.DELETE
    );
    if (deleteBoard.deletedAt == null) {
      throw new InternalServerError("삭제되지 않았음");
    }
    return {};
  }

  @Get("/notice")
  @HttpCode(200)
  @ResponseSchema(BaseBoard, {
    description: "notice board list",
    isArray: true,
    statusCode: "200"
  })
  public async getNoticeBoards(
    @QueryParam("page") page: number,
    @QueryParam("query") query?: string
  ) {
    return await this.noticeBoardService.getBoardList(page, query);
  }

  @Get("/notice/:id")
  @HttpCode(200)
  @ResponseSchema(BaseBoard, {
    description: "notice board list",
    isArray: false,
    statusCode: "200"
  })
  public async getNoticeBoard(@Param("id") id: number) {
    const notice = await this.noticeBoardService.getById(id);
    return notice;
  }

  @Post("/notice")
  @HttpCode(201)
  @OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(BaseBoard, {
    description: "save notice board ",
    isArray: false,
    statusCode: "201"
  })
  public async writeNoticeBoard(
    @CurrentUser() user: User,
    @Body() body: IBoardDTOClass
  ) {
    if (user.isAdmin != IsAdmin.ADMIN) {
      throw new UnauthorizedError("관리자가 아닙니다.");
    } else {
      return this.noticeBoardService.save({
        title: body.title,
        content: body.content
      });
    }
  }

  @Delete("/notice/:id")
  @HttpCode(204)
  @OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  public deleteNotice(@CurrentUser() user: User, @Param("id") id: number) {
    if (user.isAdmin != IsAdmin.ADMIN) {
      throw new UnauthorizedError("관리자가 아닙니다.");
    } else {
      return this.noticeBoardService.delete(id);
    }
  }

  @Get("/faq")
  @HttpCode(200)
  @ResponseSchema(BaseBoard, {
    description: "faq board list",
    isArray: true,
    statusCode: "200"
  })
  public async getFaqBoards(
    @QueryParam("page") page: number,
    @QueryParam("query") query?: string
  ) {
    return await this.faqBoardService.getBoardList(page, query);
  }

  @Get("/faq/:id")
  @HttpCode(200)
  @ResponseSchema(BaseBoard, {
    description: "faq board list",
    isArray: false,
    statusCode: "200"
  })
  public async getFaqBoard(@Param("id") id: number) {
    const faq = await this.faqBoardService.getById(id);
    return faq;
  }

  @Post("/faq")
  @HttpCode(201)
  @OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(BaseBoard, {
    description: "save faq board ",
    isArray: false,
    statusCode: "201"
  })
  public async writeFaqBoard(
    @CurrentUser() user: User,
    @Body() body: IBoardDTOClass
  ) {
    if (user.isAdmin != IsAdmin.ADMIN) {
      throw new UnauthorizedError("관리자가 아닙니다.");
    } else {
      return this.faqBoardService.save({
        title: body.title,
        content: body.content
      });
    }
  }

  @Delete("/faq/:id")
  @HttpCode(204)
  @OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(BaseBoard, {
    description: "deletefaq board * hard delete ",
    isArray: false,
    statusCode: "204"
  })
  public deleteFaq(@CurrentUser() user: User, @Param("id") id: number) {
    if (user.isAdmin != IsAdmin.ADMIN) {
      throw new UnauthorizedError("관리자가 아닙니다.");
    } else {
      return this.faqBoardService.delete(id);
    }
  }
}
