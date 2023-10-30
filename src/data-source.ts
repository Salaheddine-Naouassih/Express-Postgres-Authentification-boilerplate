import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { getConfig } from "./utils/config";
import { RefreshToken } from "./entity/RefreshToken";

const { DB_HOST, DB_PORT, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } =
  getConfig();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User, RefreshToken],
  migrationsRun: false,
  migrations: ["src/migration/*.ts"],
  migrationsTableName: "history",
  subscribers: [],
});
