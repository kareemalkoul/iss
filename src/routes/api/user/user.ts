import { Router } from "express";
import { authController } from "../../../controllers/user/auth.controller";
import { userController } from "../../../controllers/user/user.controller";
module UserRouter {
    export const router = Router();

    router.post("/login", authController.login);

    router.post("/signup", authController.signup);

    router.post("/contacts", userController.addContact);

    router.get("/contacts", userController.getContacts); 
}

export { UserRouter };
