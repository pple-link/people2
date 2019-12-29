import { JsonController } from "routing-controllers";
import { BaseController } from "./BaseController";
import { Service } from "typedi";

@Service()
@JsonController("/auth")
export class AuthController extends BaseController {}
