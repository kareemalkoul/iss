import * as core from 'express-serve-static-core';
import { Server } from "socket.io";
import { expressApp } from "./express";
import { sessionMiddleware } from './middleware/session';
import { socketSession } from './middleware/session.socket';
import { sockets } from './socketControllers';
import { checkHMAC, createHMAC, secretKeyInMAC, splitMassage } from "./middleware/hmac";
import { errorHandler } from './middleware/errorHandler.socket';

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
        this.ioSocket.use(socketSession);
    }

    listens() {
        this.ioSocket.on("connection", (socket) => {
            var req = socket.request;

            sockets.forEach(socketInfo => {
                socket.on(socketInfo.event, errorHandler(socketInfo.handler(this.ioSocket), this.ioSocket, socketInfo.event))
            });


            socket.on('disconnect', (socket) => {
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

