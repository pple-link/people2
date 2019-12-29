import { JsonController } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";

@Service()
@JsonController("/board")
export class BoardController extends BaseController {}
