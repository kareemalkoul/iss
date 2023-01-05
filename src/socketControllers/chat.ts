import { Server } from "socket.io";
import { CreateChat } from "../entities/chat/chat.create";
import { MessageInfo } from "../entities/chat/chat.message";
import {
    checkHMAC,
    createHMAC,
    secretKeyInMAC,
    splitMassage,
} from "../middleware/hmac";
import { chatService } from "../services/chats/chat";
import { emitChat } from "./assets/emit";
import { userService } from "../services/user/user";
import { socket } from "../socket";
import { EAS } from "../utils/aesWrapper";
import CryptoJS from "crypto-js";

export const getChats = (ioSocket: Server) => async (data: any) => {
    const user_id = Number(data.user_id);
    const response = await chatService.getChats(user_id);
    // console.log('Done');
    // console.log(response)
    emitChat(response, "getChats", ioSocket);
};

export const getChatHistory = (ioSocket: Server) => async (data: any) => {
    const id = data.chat_id;
    try {
        const messages = await chatService.getChatHistory(id);
        var ms = messages.map((m) => m.text);
        ioSocket.emit("chatHistory", ms);
    } catch (e) {
        console.log(e);
    }
};

export const PrimarysendMessage = (ioSocket: Server) => async (data: any) => {
    const chat_id = data.chat_id;
    const message = data.message;
    console.log("message", message);

    var aes = new EAS();
    try {
        const userSender = socket.users.find(
            (user) => user.phone == data.phone
        );
        if (userSender) {
            console.log("sessionKey", userSender.sessionKey);
            var decrypted = CryptoJS.AES.decrypt(
                message,
                userSender.sessionKey!
            );

            const userContact = socket.users.find(
                (user) => user.phone == data.contact
            );
            const me = socket.users.find((user) => user.phone == data.phone);

            const messageInfo: MessageInfo = {
                chat_id: chat_id,
                text: decrypted.toString(CryptoJS.enc.Utf8),
            };
            const response = await chatService.sendMessage(messageInfo);
            // console.log("userContact!.sessionKey!)",userContact!.sessionKey!);

            var encrypted = CryptoJS.AES.encrypt(
                response.text,
                userContact!.sessionKey!
            );

            ioSocket.sockets
                .to(userContact!.soketId)
                .to(me!.soketId)
                .emit("msgSent", encrypted.toString());
        }
    } catch (e) {
        console.log(e);
    }

    // emitChat(response, "sendMessage", ioSocket);
};

export const sendMessage = (ioSocket: Server) => async (data: any) => {
    let user_id = data.user_id;
    let message = data.message;
    let phone = data.phone;
    let destination_user_id = 5;
    // TODO get secret key for user KAREEM
    const user = { id: user_id, phone: phone };
    const secretKey = secretKeyInMAC(user);
    const [macfrommassage, rightmassage] = splitMassage(message);
    const isValid = checkHMAC(secretKey, macfrommassage, rightmassage);
    if (isValid) {
        const mac = createHMAC(secretKey, rightmassage);
        ioSocket.sockets.emit("sendChatToClient", mac);
    } else {
        ioSocket.sockets.emit("InvalidMessage", rightmassage);
    }
};

export const createChat = (ioSocket: Server) => async (data: any) => {
    const user1_id = Number(data.user1_id);
    const user2_id = Number(data.user2_id);
    const createChat: CreateChat = { user1_id: user1_id, user2_id: user2_id };
    const response = await chatService.createChat(createChat);
    emitChat(response, "createChat", ioSocket);
};

export const UserChatController = (ioSocket: Server) => async (data: any) => {
    const user_id = data.user_id;
    const phone = data.phone;
    try {
        const user2 = await userService.findOne(phone);
        var isOnline = socket.users.find((user) => user.phone == phone);
        if (!isOnline) {
            ioSocket.sockets.emit("UserIsOffline", "This contact is Offline");
            return;
        }
        try {
            const chat = await chatService.getChatByPhone(user_id, phone);
            ioSocket.sockets.emit("ChatData", chat.id);
        } catch (e) {
            console.log(e);
        }
    } catch (e) {
        console.log(e);
        ioSocket.sockets.emit("UserNotExist", "User not found");
    }
    // console.log(data);
};
