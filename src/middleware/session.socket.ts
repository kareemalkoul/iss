import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { sessionMiddleware } from "./session";


export function socketSession(socket: Socket, next: (err?: ExtendedError | undefined) => void) {
    sessionMiddleware(socket.request as any, socket.request as any, next as any);
}