import * as core from 'express-serve-static-core';
import { Server } from "socket.io";
import { expressApp } from "./express";
import { sessionMiddleware } from './middleware/session';
import { loginController, siginupController } from './socketControllers/auth';

class Socket {
    private static instance: Socket;
    public static get Instance(): Socket {
        if (!Socket.instance) {
            Socket.instance = new Socket(expressApp);
        }
        return Socket.instance;
    }

    public ioSocket: Server;

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
        this.ioSocket.use(function (socket, next) {
            sessionMiddleware(socket.request as any, socket.request as any, next as any);
        });
    }

    listens() {
        this.ioSocket.on("connection", (socket) => {
            var req = socket.request;
            socket.on('Login', loginController(this.ioSocket));
            socket.on('RegisterNewUser', siginupController(this.ioSocket));

            socket.on('disconnect', (socket) => {
                console.log("Disconnect");
            });
        });

    }


}
const socket = Socket.Instance

export { socket };

