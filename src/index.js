import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source.js";
import routes from "./routes.js";
import * as redis from "redis";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

client.connect();

app.use(express.json());
app.use(routes);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => console.log("Server is running on port 3000"));
  })
  .catch((error) => console.log(error));

export { app };
