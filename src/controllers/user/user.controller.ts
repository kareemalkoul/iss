import { RequestHandler, Response, Request } from "express";
import { UserService, userService } from "../../services/user/user";
import { ContactCreate } from "../../entities/contact/contact.create";
import { CustomRequest } from "../../middleware/authToken";
class UserController {
    private static instance: UserController;
    public static get Instance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController(userService);
        }
        return UserController.instance;
    }

    private constructor(private readonly userService: UserService) {
        // init your
    }

    addContact: RequestHandler = async (req, res) => {
        const user_id = (req as CustomRequest).user.id;
        const phone = req.body.phone;
        const name = req.body.name;
        const contact: ContactCreate = { user_id, phone, name };
        const instance = await this.userService.addContact(contact);
        res.send(instance);
    };

    getContacts: RequestHandler = async (req, res) => {
        const user_id = (req as CustomRequest).user.id;
        const contacts = await this.userService.getContacts(user_id);
        res.send(contacts);
    };
}

const userController = UserController.Instance;

export { userController };
