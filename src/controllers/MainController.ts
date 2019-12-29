import { JsonController } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";

@Service()
@JsonController("/main")
export class MainController extends BaseController {}
