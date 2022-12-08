import { Router } from "express";
import { chatRouter } from "./chat/chat";

const apiRouter = Router();

apiRouter.use("/chat", chatRouter);

export { apiRouter }