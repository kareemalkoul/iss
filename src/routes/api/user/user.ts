import { Router } from "express";
import { authController } from "../../../controllers/user/auth.controller";
import { userController } from "../../../controllers/user/user.controller";
import { authToken } from "../../../middleware/authToken";
module UserRouter {
    export const router = Router();

    router.post("/login", authController.login);

    router.post("/signup", authController.signup);

    router.post("/contacts", authToken, userController.addContact);

    router.get("/contacts", authToken, userController.getContacts);
}

export { UserRouter };
