import { Server } from "socket.io";
import { loginController, siginupController } from "./auth";
import { sendMessage, UserChatController } from "./chat";


interface SocketControllerInterface {
    path: string;
    event: string;
    handler: (ioSocket: Server) => (data: any) => Promise<void>;
}


export const sockets: SocketControllerInterface[] = [
    { path: "/", event: "Login", handler: loginController },
    { path: "/", event: "RegisterNewUser", handler: siginupController },
    { path: "/", event: "UserChat", handler: UserChatController },
    { path: "/", event: "sendChatToServer", handler: sendMessage },
]