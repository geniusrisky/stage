import "reflect-metadata";
import express, { json } from "express";
import * as dotenv from "dotenv";
import { DatabaseModels } from "./config/database";
import Container from "typedi";
import routes from "./Routes";
import logger from "./logger";

dotenv.config();

Container.get(DatabaseModels);

const app = express();
app.use(json({ limit: "100mb" }));
app.use("/stage", routes);

const PORT = process.env.PORT || 8023;

process.on("uncaughtException", (err: any) => {
  if (err) {
    logger.error({
      error: err,
    });
  }
  setTimeout(() => {
    process.exit();
  }, 3000);
});

app.listen(PORT, () => {
  console.log(`Server Started on port : ${PORT}`);
});