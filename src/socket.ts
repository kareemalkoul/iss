import * as core from 'express-serve-static-core';
import {Server} from "socket.io";
import {expressApp} from "./express";
import {sessionMiddleware} from './middleware/session';
import {socketSession} from './middleware/session.socket';
import {sockets} from './socketControllers';
import {checkHMAC, createHMAC, secretKeyInMAC, splitMassage} from "./middleware/hmac";

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
            cors: {origin: "*"}
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
                socket.on(socketInfo.event, socketInfo.handler(this.ioSocket))
            });

            socket.on('RegisterNewUser', (data) => {
                this.ioSocket.sockets.emit("user_logged", "test");
            });

            socket.on('UserChat', (data) => {

                this.ioSocket.sockets.emit("ChatData", "Content");
            });
            socket.on('sendChatToServer', (data) => {
                let user_id = data.user_id;
                let message = data.message;
                let destination_user_id = 5;//data.destination_user_id;
                // TODO get secret key for user KAREEM
                const user = {id: user_id, phone: "0936264641"};
                const secretKey = secretKeyInMAC(user)
                const [macfrommassage, rightmassage] = splitMassage(message);
                const isValid = checkHMAC(secretKey, macfrommassage, rightmassage)
                if (isValid) {
                    const mac = createHMAC(secretKey, rightmassage);
                    this.ioSocket.sockets.emit('sendChatToClient', mac);
                } else {
                    this.ioSocket.sockets.emit('InvalidMessage', rightmassage);

                }
            });

            socket.on('disconnect', (socket) => {
                console.log("Disconnect");
            });
        });

    }


}

const socket = Socket.Instance

export {socket};

