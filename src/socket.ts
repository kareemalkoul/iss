import * as core from "express-serve-static-core";
import { Server } from "socket.io";
import { expressApp } from "./express";
import { sessionMiddleware } from "./middleware/session";
import { socketSession } from "./middleware/session.socket";
import { sockets } from "./socketControllers";
import openpgp from "openpgp"
import {
    checkHMAC,
    createHMAC,
    secretKeyInMAC,
    splitMassage,
} from "./middleware/hmac";

import { errorHandler } from "./middleware/errorHandler.socket";
interface UserSocket {
    soketId: string;
    phone: string;
    sessionKey?: string;
}

interface Keys {
    privateKey: string;
    publicKey: string;

}

// const keys = (async (): Promise<Keys>=> {
//     const { privateKey, publicKey } = await openpgp.generateKey({
//         type: 'rsa', // Type of the key
//         rsaBits: 4096, // RSA key size (defaults to 4096 bits)
//         userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
//         passphrase: 'super long and hard to guess secret' // protects the private key
//     });
//     return {privateKey, publicKey}
// })();



class Socket {
    private static instance: Socket;

    public static get Instance(): Socket {
        if (!Socket.instance) {
            Socket.instance = new Socket(expressApp);
        }
        return Socket.instance;
    }

    public ioSocket: Server;
    public users: UserSocket[] = [];

    constructor(private readonly expressApp: core.Express) {
        const httpServer = require("http").createServer(expressApp);
        this.ioSocket = new Server(httpServer, {
            /* options */
            cors: { origin: "*" },
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
            console.log("User connected", socket.handshake.auth);
            if (phone) {
                const user: UserSocket = {
                    soketId: socket.id,
                    phone: phone,
                };
                (socket as any).user = user;
                this.users.push(user);
            }
            next();
        });
    }

    listens() {
        this.ioSocket.on("connection", (socket) => {
            sockets.forEach((socketInfo) => {
                const handler = socketInfo.handler(this.ioSocket, socket);
                socket.on(
                    socketInfo.event,
                    errorHandler(handler, this.ioSocket, socketInfo.event)
                );
            });

            socket.on("disconnect", () => {
                const user = (socket as any).user;
                if (user) {
                    var index = this.users.indexOf(user);
                    if (index !== -1) {
                        this.users.splice(index, 1);
                    }
                }
                try {
                    console.log("Disconnect user", user.phone);
                } catch (e) {
                    console.log(e);
                }
            });

            socket.on("connect_error", (err) => {
                console.log("err.message"); // prints the message associated with the error
            });
        });
    }
}

const socket = Socket.Instance;

export { socket };
