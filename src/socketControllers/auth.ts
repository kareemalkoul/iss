import { Server } from "socket.io";
import { UserLogin } from "../entities/user/user.login";
import { UserSignUp } from "../entities/user/user.signup";
import { authService } from "../services/user/auth";


export const loginController = (ioSocket: Server) => async (data: any) => {
    const phone = data.phone;
    const password = data.password;
    const userLogin: UserLogin = { phone: phone, password: password };
    let user = await authService.login(userLogin);
    console.log('Done');
    console.log(user)
    if (user) {
        console.log("user exists");
        ioSocket.sockets.emit("Valid", "Tokendhsjkcl,z;x./");
    } else {
        console.log("user does not exists");
        ioSocket.sockets.emit('invalid', "Invalid Credentials");
    }
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
    const messege = await authService.siginup(userSignUp);
    ioSocket.sockets.emit('user_logged', data);
}
