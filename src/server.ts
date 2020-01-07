import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import "./utils/env";

useContainer(Container);
const app = express();
console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);

useExpressServer(app, {
  cors: true,
  controllers: [`${__dirname}/controllers/*.[jt]s`],
  middlewares: [`${__dirname}/middlewares/*.[jt]s`],
  interceptors: [`${__dirname}/interceptors/*.[jt]s`]
});

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
