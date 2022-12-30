import { RequestHandler } from "express";
import { CreateChat } from "../../entities/chat/chat.create";
import { MessageInfo } from "../../entities/chat/chat.message";
import { chatService, ChatService } from "../../services/chats/chat";

class ChatController {
    private static instance: ChatController;
    public static get Instance(): ChatController {
        if (!ChatController.instance) {
            ChatController.instance = new ChatController(chatService);
        }
        return ChatController.instance;
    }

    constructor(private readonly chatService: ChatService) {
        // init your 
    }

    getChats: RequestHandler = async (req, res) => {

        const user_id = Number(req.query.user_id);
        const response = await this.chatService.getChats(user_id);
        res.send(response);
    }

    getChat: RequestHandler = async (req, res) => {

        const id = Number(req.params.id);
        const response = await this.chatService.getChatHistory(id);
        res.send(response);
    }

    sendMessage: RequestHandler = async (req, res) => {

        const chat_id = Number(req.params.id);
        const message = req.body.message;
        const messageInfo: MessageInfo = { chat_id: chat_id, text: message };
        const response = await this.chatService.sendMessage(messageInfo);
        res.send(response);
    }

    createChat: RequestHandler = async (req, res) => {

        const user1_id = Number(req.body.user1_id);
        const user2_id = Number(req.body.user2_id);
        const createChat: CreateChat = { user1_id: user1_id, user2_id: user2_id };
        const response = await this.chatService.createChat(createChat);
        res.send(response);
    }

}

const chatController = ChatController.Instance;

export { chatController };
