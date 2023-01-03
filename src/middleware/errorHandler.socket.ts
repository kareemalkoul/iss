import { Server } from "socket.io";

export function errorHandler(handler: Function, ioSocket: Server, event: string) {
    const handleError = (err: Error) => {
        ioSocket.sockets.emit('invalid', err.message);
        console.error("error in", event);
    };

    return (...args: any[]) => {
        try {

            const ret = handler.apply(this, args);
            if (ret && typeof ret.catch === "function") {
                // async handler
                ret.catch(handleError);
            }
        } catch (e: any) {
            // sync handler
            handleError(e);
        }
    };
};