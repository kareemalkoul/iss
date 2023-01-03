

export const wrap = (middleware: (arg0: any, arg1: {}, arg2: any) => any) => (socket: { request: any; }, next: any) => middleware(socket.request, {}, next);
