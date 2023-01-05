import { Server, Socket } from "socket.io";
import { UserLogin } from "../entities/user/user.login";
import { UserSignUp } from "../entities/user/user.signup";
import { authService } from "../services/user/auth";
import { Config } from "../utils/config";
import { socket } from "../socket";
import { RsaWrapper } from "../utils/rsaWrapper";
export const loginController = (ioSocket: Server, socket: Socket) => async (data: any) => {
    const phone = data.phone;
    const password = data.password;
    const userLogin: UserLogin = { phone: phone, password: password };
    try {
        // console.log("test")
        let user = await authService.login(userLogin);
        // console.log("User exists");
        // console.log(user)
        ioSocket.sockets.emit("Valid", user);
    } catch (error: any) {
        // console.log(error);
        ioSocket.sockets.emit("invalid", error.message);
    }
    // console.log('Done');
};

export const siginupController = (ioSocket: Server, socket: Socket) => async (data: any) => {
    const name = data.name;
    const phone = data.phone;
    const password = data.password;
    const userSignUp: UserSignUp = {
        user_name: name,
        phone: phone,
        password: password,
    };
    // console.log(userSignUp)

    const user = await authService.siginup(userSignUp);
    console.log(user);
    ioSocket.sockets.emit("user_logged", user);
};

export const getPupKeyController = (ioSocket: Server, s: Socket) => async (data: any) => {
    const r = new RsaWrapper();
    const userContact = socket.users.find((user) => user.phone == data.phone);
    ioSocket.sockets
        .to(userContact!.soketId)
        .emit("serverPubKey", r.serverPub.toString());
};
export const setSessionKeyController =
    (ioSocket: Server, s: Socket) => async (data: any) => {
        try {
            const phone = data.phone;
            const encryptedSessionKey = data.encryptedSessionKey;
            const r = new RsaWrapper();
            var d = r.decrypt(r.serverPrivate, encryptedSessionKey);

            const userIndex = socket.users.findIndex(
                (user) => user.phone == phone
            );
            socket.users[userIndex].sessionKey = d
        } catch (e) {
            console.log(e);
        }
    };
