import { Server } from "socket.io";

export function emitChat(response: any, name: string, ioSocket: Server) {
    // !imeplemenet
    if (response) {
        console.log(`${name} exists`);
        ioSocket.sockets.emit(`Valid-${name}`, `${name}`);
    } else {
        console.log(`${name} does not exists`);
        ioSocket.sockets.emit(`invalid-${name}`, `${name}`);
    }
}

