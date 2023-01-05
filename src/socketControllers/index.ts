import { Server, Socket } from "socket.io";
import { loginController, siginupController, getPupKeyController, setSessionKeyController } from "./auth";
import { PrimarysendMessage, sendMessage, UserChatController, getChatHistory } from "./chat";
import { getContacts, addContact } from "./contact";

interface SocketControllerInterface {
    path: string;
    event: string;
    handler: (ioSocket: Server, socket: Socket) => (data: any) => Promise<void>;
}


export const sockets: SocketControllerInterface[] = [
    { path: "/", event: "Login", handler: loginController },
    { path: "/", event: "RegisterNewUser", handler: siginupController },
    { path: "/", event: "UserChat", handler: UserChatController },
    { path: "/", event: "sendChatToServer", handler: sendMessage },
    { path: "/", event: "getContacts", handler: getContacts },
    { path: "/", event: "addContact", handler: addContact },
    { path: "/", event: "sendMsdToUser", handler: PrimarysendMessage },
    { path: "/", event: "getChatHistory", handler: getChatHistory },
    { path: "/", event: "getPubKey", handler: getPupKeyController },
    { path: "/", event: "setSessionKey", handler: setSessionKeyController },


]