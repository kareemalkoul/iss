import { Server } from "socket.io";



interface SocketControllerInterface {
    path: string;
    handler: (ioSocket: Server[]) => (data: any) => Promise<void>;
}
