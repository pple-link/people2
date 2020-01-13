import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import "./utils/env";
import { routingControllerOptions } from "./utils/routingConfig";
import swaggerUi from "swagger-ui-express";
import * as Sentry from "@sentry/node";

useContainer(Container);
const app = express();
console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);

Sentry.init({
  dsn: process.env.SENTRY_DSN
});
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);

useExpressServer(app, routingControllerOptions);
export function runServer(host: string, port: number) {
  return new Promise((resolve, reject) => {
    app.listen(port, host, (err: any) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

import { spec } from "./utils/swagger";

app.use(swaggerUi.serve);
app.get("/", swaggerUi.setup(spec));

app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

app.use((err: string, _req: Request, res: Response, _next: NextFunction) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  console.log(err);
  res.end(`{ result: false, error: ${err} }`);
});
export { app };
