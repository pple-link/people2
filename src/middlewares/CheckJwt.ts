import {
  ExpressMiddlewareInterface,
  Middleware,
  MethodNotAllowedError
} from "routing-controllers";
import { Authentication } from "../utils/Authenticate";
import express from "express";

@Middleware({ type: "after" })
export class CheckJwt implements ExpressMiddlewareInterface {
  // interface implementation is optional

  constructor() {}

  use(
    request: express.Request,
    response: express.Response,
    next: (err?: any) => any
  ): any {
    const jwt: string = request.headers.authorization as string;
    if (jwt == undefined) {
      next();
    } else if (!Authentication.isToken(jwt)) {
      next(new MethodNotAllowedError("토큰이 아닙니다."));
    } else if (!Authentication.verifyToken(jwt)) {
      next(new MethodNotAllowedError("유효하지 않은 토큰 입니다."));
    } else {
      const token = Authentication.refreshToken(jwt);
      response.setHeader("authorization", token);
    }
    next();
  }
}
