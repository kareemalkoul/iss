import { Router } from "express";
import { UserRouter } from "./user/user";

const apiRouter = Router();

apiRouter.use("/user", UserRouter.router);

export { apiRouter }