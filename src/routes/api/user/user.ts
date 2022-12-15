import { Router } from "express";
import { userController } from "../../../controllers/user/user.controller";


module UserRouter {

    export const router = Router();

    router.post('/login', userController.login);

    router.post('/signup', userController.signup);

}

export { UserRouter }