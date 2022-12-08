import { Router } from "express";
import { loginController, signupController } from "../../../controllers/chat/chat.controller";

const chatRouter = Router();


chatRouter.post('/login', loginController);

chatRouter.post('/signup', signupController);


export { chatRouter }