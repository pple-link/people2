import path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "host",
  port: 5432,
  username: "people",
  password: "password",
  database: "people",
  synchronize: false,
  logging: false,
  entities: [`${path.join(__dirname, "..", "models")}/*.[ts]s`],
  migrations: [`${__dirname}/models/*.[ts]s`]
};

export { typeOrmConfig };
