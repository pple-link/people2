import { JsonController, Get } from "routing-controllers";
import { BaseController } from "./BaseController";
import { spec } from "../utils/swagger";

@JsonController("/")
export class RootController extends BaseController {
  @Get()
  index() {
    return spec;
  }
}
