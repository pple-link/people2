import {
  ExpressMiddlewareInterface,
  Middleware,
  Req,
  Res
} from "routing-controllers";

import { NextFunction, Request, Response } from "express";
import { ApiLogService } from "../services";
import Container from "typedi";

@Middleware({ type: "before" })
export class StartTimerMiddleware implements ExpressMiddlewareInterface {
  use(@Req() request: Request, @Res() _: Response, next: NextFunction): void {
    console.log("timer is started.");
    request.query.startTime = String(new Date().getTime());
    next();
  }
}

@Middleware({ type: "after" })
export class endTimerMiddleware implements ExpressMiddlewareInterface {
  async use(
    request: Request,
    @Res() _: Response,
    next: NextFunction
  ): Promise<void> {
    const time = new Date().getTime();
    const delay = time - Number(request.query.startTime);
    const apiLogService = Container.get(ApiLogService);
    const user = request.query.user;
    const log = `${request.method}|${request.url}`;

    await apiLogService.save(user, log, delay);
    next();
  }
}
