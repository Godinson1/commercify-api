import { DataSource } from "typeorm";
import { Item } from "./entity/Item.js";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ["src/entity/*.js"],
  migrations: ["src/migration/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
  },
  subscribers: [],
});
