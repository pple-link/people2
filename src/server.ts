import "reflect-metadata";
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import "./utils/env";
import { routingControllerOptions } from "./utils/routingConfig";

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

export { app };
