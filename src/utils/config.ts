import * as dotenv from "dotenv";

dotenv.config();

interface Config {
  DB_HOST: string;
  DB_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  PORT: number;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
}

export const getConfig = (): Config => ({
  DB_HOST: process.env.PG_HOST,
  DB_PORT: Number(process.env.PG_PORT),
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  PORT: Number(process.env.PORT) || 3000,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
});
