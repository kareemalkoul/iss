import {Server} from "socket.io";
import {UserLogin} from "../entities/user/user.login";
import {UserSignUp} from "../entities/user/user.signup";
import {authService} from "../services/user/auth";


export const loginController = (ioSocket: Server) => async (data: any) => {
    const phone = data.phone;
    const password = data.password;
    const userLogin: UserLogin = {phone: phone, password: password};
    try {
        console.log("test")
        let user = await authService.login(userLogin);
        console.log("User exists");
        console.log(user)
        ioSocket.sockets.emit("Valid", user);

    } catch (error: any) {
        console.log(error);
        ioSocket.sockets.emit('invalid', error.message);
    }
    console.log('Done');
}


export const siginupController = (ioSocket: Server) => async (data: any) => {
    const name = data.name;
    const phone = data.phone;
    const password = data.password;
    const userSignUp: UserSignUp = {
        user_name: name,
        phone: phone,
        password: password,
    };
    console.log(userSignUp)
    const message = await authService.siginup(userSignUp);
    ioSocket.sockets.emit('user_logged', data);
}
