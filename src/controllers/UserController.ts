import { JsonController } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";

@Service()
@JsonController("/user")
export class UserController extends BaseController {}
