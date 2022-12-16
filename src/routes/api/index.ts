import { Router } from "express";
import { ChatRouter } from "./chat/chat";
import { UserRouter } from "./user/user";

const apiRouter = Router();

apiRouter.use("/user", UserRouter.router);
apiRouter.use("/chat", ChatRouter.router);

export { apiRouter }