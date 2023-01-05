import { Server } from "socket.io";
import { CreateChat } from "../entities/chat/chat.create";
import { MessageInfo } from "../entities/chat/chat.message";
import {
    checkHMAC,
    createHMAC,
    mergeMassage,
    secretKeyInMAC,
    splitMassage,
} from "../middleware/hmac";
import { chatService } from "../services/chats/chat";
import { emitChat } from "./assets/emit";
import { userService } from "../services/user/user";
import { Socket } from "socket.io"
import { socketInstance } from "../socket";
import { AESEncryption } from "../utils/encryption.aes";
import CryptoJS from "crypto-js";

export const getChats = (ioSocket: Server, socket: Socket) => async (data: any) => {
    const user_id = Number(data.user_id);
    const response = await chatService.getChats(user_id);
    // console.log('Done');
    // console.log(response)
    emitChat(response, "getChats", ioSocket);
};

export const getChat = (ioSocket: Server, socket: Socket) => async (data: any) => {
    const id = Number(data.chat_id);
    const response = await chatService.getChatHistory(id);
    const messages = response.map((message: any) => message.toJSON())
    ioSocket.sockets.to(socket.id).emit("chatHistory", messages);
};

export const PrimarysendMessage = (ioSocket: Server, socket: Socket) => async (data: any) => {
    // console.log("🚀 ~ file: chat.ts:42 ~ PrimarysendMessage ~ socket.handshake.auth", socket.handshake.auth)
    const phone1 = socket.handshake.auth.phone
    const user1 = await userService.getUserByPhone(phone1);
    const secretKey1 = user1.id + user1.phone;
    // const aesKey1 = secretKey1.slice(-2).repeat(16)
    const [mac1, massage1] = splitMassage(data)
    const didntChangeInMassage = checkHMAC(secretKey1, mac1, massage1);
    // const didntChangeInMassage = false;
    if (didntChangeInMassage) {
        const decryptedMessage1 = AESEncryption.decrypt(secretKey1, massage1).toString(CryptoJS.enc.Utf8);
        data = JSON.parse(decryptedMessage1)
        // data = JSON.parse(massage1)
        const chat_id = data.chat_id;
        const message = data.message;
        const messageInfo: MessageInfo = { chat_id: chat_id, text: message };
        const response = await chatService.sendMessage(messageInfo);

        const phone2 = data.contact
        const user2 = await userService.getUserByPhone(phone2);
        const secretKey2 = user2.id + user2.phone;

        const theOtherSideContact = socketInstance.users.find(user => user.phone == phone2)
        // const theOtherSocket = ioSocket.sockets.sockets.get(theOtherSideContact!.soketId)
        const massage2 = response.text
        const decryptedMessage2 = AESEncryption.encrypt(secretKey2, massage2).toString();

        const mac2 = createHMAC(secretKey2, decryptedMessage2)
        // const massageAfterCrypto = mergeMassage(mac2, "massage2")
        const massageAfterCrypto = mergeMassage(mac2, decryptedMessage2)
        ioSocket.sockets.to([theOtherSideContact!.soketId]).emit("msgSent", massageAfterCrypto);
    } else {
        ioSocket.sockets.to(socket.id).emit("error_connection", "changeInMassage");

    }


};

// export const sendMessage = (ioSocket: Server, socket: Socket) => async (data: any) => {
//     let user_id = data.user_id;
//     let message = data.message;
//     let phone = data.phone;
//     let destination_user_id = 5;
//     // TODO get secret key for user KAREEM
//     const user = { id: user_id, phone: phone };
//     const secretKey = secretKeyInMAC(user);
//     const [macfrommassage, rightmassage] = splitMassage(message);
//     const isValid = checkHMAC(secretKey, macfrommassage, rightmassage);
//     if (isValid) {
//         const mac = createHMAC(secretKey, rightmassage);
//         ioSocket.sockets.emit("sendChatToClient", mac);
//     } else {
//         ioSocket.sockets.emit("InvalidMessage", rightmassage);
//     }
// };

export const createChat = (ioSocket: Server, socket: Socket) => async (data: any) => {
    const user1_id = Number(data.user1_id);
    const user2_id = Number(data.user2_id);
    const createChat: CreateChat = { user1_id: user1_id, user2_id: user2_id };
    const response = await chatService.createChat(createChat);
    emitChat(response, "createChat", ioSocket);
};

export const UserChatController = (ioSocket: Server, socket: Socket) => async (data: any) => {
    const user_id = data.user_id;
    const phone = data.phone;
    try {
        const user2 = await userService.getUserByPhone(phone);
        var isOnline = socketInstance.users.find((user) => user.phone == phone);
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
