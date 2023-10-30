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

/* 

import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));

*/
