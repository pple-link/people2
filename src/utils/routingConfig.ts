export const routingControllerOptions = {
  cors: true,
  controllers: [`${__dirname}/../controllers/*.[jt]s`],
  middlewares: [`${__dirname}/../middlewares/*.[jt]s`]
};
