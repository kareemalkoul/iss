import { Server } from "socket.io";
import { CreateChat } from "../entities/chat/chat.create";
import { MessageInfo } from "../entities/chat/chat.message";
import { checkHMAC, createHMAC, secretKeyInMAC, splitMassage } from "../middleware/hmac";
import { chatService } from "../services/chats/chat";
import { emitChat } from "./assets/emit";
import { userService } from "../services/user/user";
import { socket } from "../socket";
export const getChats = (ioSocket: Server) => async (data: any) => {
    const user_id = Number(data.user_id);
    const response = await chatService.getChats(user_id);
    // console.log('Done');
    // console.log(response)
    emitChat(response, "getChats", ioSocket);

}


export const getChat = (ioSocket: Server) => async (data: any) => {

    const id = Number(data.id);
    const response = await chatService.getChatHistory(id);

    emitChat(response, "getChat", ioSocket);
}

export const PrimarysendMessage = (ioSocket: Server) => async (data: any) => {

    const chat_id = Number(data.id);
    const message = data.message;
    const messageInfo: MessageInfo = { chat_id: chat_id, text: message };
    const response = await chatService.sendMessage(messageInfo);
    emitChat(response, "sendMessage", ioSocket);
}

export const sendMessage = (ioSocket: Server) => async (data: any) => {

    let user_id = data.user_id;
    let message = data.message;
    let phone = data.phone;
    let destination_user_id = 5;
    // TODO get secret key for user KAREEM
    const user = { id: user_id, phone: phone };
    const secretKey = secretKeyInMAC(user)
    const [macfrommassage, rightmassage] = splitMassage(message);
    const isValid = checkHMAC(secretKey, macfrommassage, rightmassage)
    if (isValid) {
        const mac = createHMAC(secretKey, rightmassage);
        ioSocket.sockets.emit('sendChatToClient', mac);
    } else {
        ioSocket.sockets.emit('InvalidMessage', rightmassage);

    }
}

export const createChat = (ioSocket: Server) => async (data: any) => {
    const user1_id = Number(data.user1_id);
    const user2_id = Number(data.user2_id);
    const createChat: CreateChat = { user1_id: user1_id, user2_id: user2_id };
    const response = await chatService.createChat(createChat);
    emitChat(response, "createChat", ioSocket);
}

export const UserChatController = (ioSocket: Server) => async (data: any) => {
    const user_id = data.user_id;
    const phone = data.phone;
    const user2 = await userService.findOne(phone)
    if(!user2){
        ioSocket.sockets.emit("UserNotExist", "User not found");
    }
    var isOnline = socket.users.find((user) => user.phone == phone)
    if(!isOnline){
        ioSocket.sockets.emit("UserIsOffline", "This contact is Offline");
        return
    }
    try{
        const chat = await chatService.getChatByPhone(user_id, phone);
        
        ioSocket.sockets.emit("ChatData", chat.id);
    }
    catch(e){
        console.log(e);
    }

}

