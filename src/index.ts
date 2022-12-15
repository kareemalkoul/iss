import express from "express";
import { Config } from "./utils/config";
import "./repo/database";
import { apiRouter } from "./routes/api";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

const server = app.listen(Config.server.Port);

export { server };