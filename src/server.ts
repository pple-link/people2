import "reflect-metadata";
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import "./utils/env";
import { routingControllerOptions } from "./utils/routingConfig";
import swaggerUi from "swagger-ui-express";

useContainer(Container);
const app = express();
console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);

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

export { app };
