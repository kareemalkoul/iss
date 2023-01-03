import * as core from 'express-serve-static-core';
import { Server } from "socket.io";
import { expressApp } from "./express";
import { sessionMiddleware } from './middleware/session';
import { socketSession } from './middleware/session.socket';
import { sockets } from './socketControllers';
import { checkHMAC, createHMAC, secretKeyInMAC, splitMassage } from "./middleware/hmac";
import { errorHandler } from './middleware/errorHandler.socket';
interface LooseObject {
    [key: string]: any
}
class Socket {
    private static instance: Socket;

    public static get Instance(): Socket {
        if (!Socket.instance) {
            Socket.instance = new Socket(expressApp);
        }
        return Socket.instance;
    }

    public ioSocket: Server;
    private users: string[] = []

    constructor(private readonly expressApp: core.Express) {
        const httpServer = require('http').createServer(expressApp);
        this.ioSocket = new Server(httpServer, {
            /* options */
            cors: { origin: "*" }
        });
        httpServer.listen(8000, () => {
            console.log("Socket is running on port : " + 8000);
        });
        this.middlwares();
        this.listens();
    }


    middlwares() {
        // token is here
        // ! fix types here
        this.ioSocket.use(socketSession);
        this.ioSocket.use((socket, next) => {
            const phone = socket.handshake.auth.phone;
            console.log("🚀 ~ file: socket.ts:45 ~ Socket ~ this.ioSocket.use ~ socket.handshake.auth", socket.handshake.auth)
            if (phone) {
                (socket as any).phone = phone;
                this.users.push(phone);
            }
            next();
        });
    }

    listens() {
        this.ioSocket.on("connection", (socket) => {
            console.log(this.users);
            // var req = socket.request;
            sockets.forEach(socketInfo => {
                const handler = socketInfo.handler(this.ioSocket);
                socket.on(socketInfo.event, errorHandler(handler, this.ioSocket, socketInfo.event));
            });

            socket.on('disconnect', () => {
                console.log(socket.rooms);
                const phone = (socket as any).phone
                var index = this.users.indexOf(phone);
                if (index !== -1) {
                    this.users.splice(index, 1);
                }
                console.log(phone)
                console.log("Disconnect");
            });

            socket.on("connect_error", (err) => {
                console.log("err.message"); // prints the message associated with the error
            });
        });

    }


}

const socket = Socket.Instance

export { socket };

