import { Server } from "socket.io";
import { loginController, siginupController } from "./auth";



interface SocketControllerInterface {
    path: string;
    event: string;
    handler: (ioSocket: Server) => (data: any) => Promise<void>;
}


export const sockets: SocketControllerInterface[] = [
    { path: "/", event: "Login", handler: loginController },
    { path: "/", event: "RegisterNewUser", handler: siginupController },
]