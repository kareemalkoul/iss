import { RequestHandler, Response, Request } from "express";
import { UserLogin } from "../../entities/user/user.login";
import { UserSignUp } from "../../entities/user/user.signup";
import { AuthService } from "../../services/user/auth";

class AuthController {
    private static instance: AuthController;
    public static get Instance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    constructor(private readonly authService: AuthService = new AuthService()) {
        // init your
    }

    login: RequestHandler = async (req, res) => {
        const phone = req.body.phone;
        const password = req.body.password;
        const userLogin: UserLogin = { phone: phone, password: password };
        const user = await this.authService.login(userLogin);
        
        res.send(user);
    };

    signup: RequestHandler = async (req, res) => {
        const name = req.body.name;
        const phone = req.body.phone;
        const password = req.body.password;
        const userSignUp: UserSignUp = {
            user_name: name,
            phone: phone,
            password: password,
        };
        const messege = await this.authService.siginup(userSignUp);
        res.send(messege);
    };
}

const authController = AuthController.Instance;

export { authController };
