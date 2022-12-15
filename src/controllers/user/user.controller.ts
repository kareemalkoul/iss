import { RequestHandler, Response, Request } from "express"
import { UserLogin } from "../../entities/user/user.login";
import { UserSignUp } from "../../entities/user/user.signup";
import { UserService } from "../../services/user/user";

class UserController {
    private static instance: UserController;
    public static get Instance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    constructor(private readonly userService: UserService = new UserService()) {
        // init your 
    }

    login: RequestHandler = async (req, res) => {

        const phone = req.body.phone;
        const password = req.body.password;
        const userLogin: UserLogin = { phone: phone, password: password };
        const user = await this.userService.login(userLogin);
        res.send(user);
    }

    signup: RequestHandler = async (req, res) => {

        const name = req.body.name;
        const phone = req.body.phone;
        const password = req.body.password;
        const userSignUp: UserSignUp = { user_name: name, phone: phone, password: password };
        const messege = await this.userService.siginup(userSignUp);
        res.send(messege);
    }

}

const userController = UserController.Instance


export { userController }