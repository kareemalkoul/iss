import { Server } from "socket.io";
import { CreateChat } from "../entities/chat/chat.create";
import { MessageInfo } from "../entities/chat/chat.message";
import { chatService } from "../services/chats/chat";
import { emitChat } from "./assets/emit";

export const getChats = (ioSocket: Server) => async (data: any) => {
    const user_id = Number(data.user_id);
    const response = await chatService.getChats(user_id);
    console.log('Done');
    console.log(response)
    emitChat(response, "getChats", ioSocket);

}


export const getChat = (ioSocket: Server) => async (data: any) => {

    const id = Number(data.id);
    const response = await chatService.getChatHistory(id);

    emitChat(response, "getChat", ioSocket);
}

export const sendMessage = (ioSocket: Server) => async (data: any) => {

    const chat_id = Number(data.id);
    const message = data.message;
    const messageInfo: MessageInfo = { chat_id: chat_id, text: message };
    const response = await chatService.sendMessage(messageInfo);
    emitChat(response, "sendMessage", ioSocket);
}

export const createChat = (ioSocket: Server) => async (data: any) => {

    const user1_id = Number(data.user1_id);
    const user2_id = Number(data.user2_id);
    const createChat: CreateChat = { user1_id: user1_id, user2_id: user2_id };
    const response = await chatService.createChat(createChat);
    emitChat(response, "createChat", ioSocket);
}

