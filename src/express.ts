import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { customInterceptor } from "./middleware/interceptor";
import "./repo/database";
import { apiRouter } from "./routes/api";
import { Config } from "./utils/config";
import CustomError from "./utils/errors/customeError";

// import {createServer} from "http";
const app = express();

app.use(express.static(__dirname + "/../pages"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customInterceptor);
app.use(morgan("dev"));
app.use("/api", apiRouter);

app.use(CustomError.errorMiddleware);

const server = app.listen(Config.server.Port);

export { app as expressApp, server };


