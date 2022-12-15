import "express-async-errors";
import express from "express";
import { Config } from "./utils/config";
import "./repo/database";
import { apiRouter } from "./routes/api";
import CustomError from "./utils/errors/customeError";
import { customInterceptor } from "./middleware/interceptor";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customInterceptor);

app.use("/api", apiRouter);

app.use(CustomError.errorMiddleware);

const server = app.listen(Config.server.Port);

export { server };