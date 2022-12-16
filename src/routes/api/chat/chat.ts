import { Router } from "express";
import { chatController } from "../../../controllers/chat/chat.controller";

module ChatRouter {

    export const router = Router();

    router.get('/', chatController.getChats);

    router.get('/:id([0-9]+)', chatController.getChat);

    router.post('/', chatController.createChat);

    router.post('/message/:id([0-9]+)', chatController.sendMessage);

}

export { ChatRouter }