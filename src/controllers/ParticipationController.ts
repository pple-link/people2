import { BaseController } from "./BaseController";
import {
  JsonController,
  UseInterceptor,
  Post,
  CurrentUser,
  Param,
  NotFoundError,
  MethodNotAllowedError,
  Body,
  HttpCode,
  InternalServerError
} from "routing-controllers";
import { ResponseJosnInterceptor } from "../interceptors/ResponseJsonInterceptor";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { User, Participation, ParticipationBoard } from "../models";
import {
  DirectBoardService,
  ParticipationService,
  ParticipationBoardService
} from "../services";
import { ShowFlag } from "../models/Enum";
import Container from "typedi";
import { IParticipationBoardDTO } from "../services/ParticipationBoardService";

@JsonController("/participate")
@UseInterceptor(ResponseJosnInterceptor)
export class ParticipationController extends BaseController {
  constructor(
    private directBoardService: DirectBoardService,
    private participationService: ParticipationService
  ) {
    super();
  }

  @Post("/:direct_board_id")
  @HttpCode(201)
  @OpenAPI({
    summary: "make new participation",
    description: "a user make new participation to direct Board",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(Participation, {
    description: "new Participate",
    isArray: false,
    statusCode: "201"
  })
  public async newParticipation(
    @CurrentUser({ required: true }) user: User,
    @Param("direct_board_id") id: number
  ) {
    const board = await this.directBoardService.getById(id);
    if (board.showFlag == ShowFlag.SHOW && board.deletedAt == null) {
      const participation = this.participationService.save(user, id);
      return participation;
    } else {
      throw new NotFoundError("directBoard not Found");
    }
  }

  @Post("/:participation_id/board")
  @HttpCode(201)
  @OpenAPI({
    summary: "make new participation board",
    description:
      "a user make new participation board to direct Board, need title:string, content:string, header",
    security: [{ bearerAuth: [] }] // Applied to each method
  })
  @ResponseSchema(ParticipationBoard, {
    description: "new Participation Board",
    isArray: false,
    statusCode: "201"
  })
  public async newParticipationBoard(
    @CurrentUser({ required: true }) user: User,
    @Param("participation_id") id: number,
    @Body() body: Pick<IParticipationBoardDTO, "title" | "content">
  ) {
    const participation = await this.participationService.getById(id, [
      "participationBoard"
    ]);
    if (participation?.participationBoard)
      throw new MethodNotAllowedError(
        "해당 신청으로 응원 메세지를 보낸 글이 있습니다. 확인해주세요. 아니면 새로 신청해주세요."
      );
    else {
      const participationBoardService = Container.get(
        ParticipationBoardService
      );
      const board = await participationBoardService.save({
        title: body.title,
        content: body.content,
        user: user
      });

      if (board) {
        await this.participationService.update(participation.id, board);
      } else {
        throw new InternalServerError(
          "데이터 저장에 실패했습니다. 다시 시도하여주세요."
        );
      }
      return board;
    }
  }
}
