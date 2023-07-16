import { contactEntity } from "../../entities/contact/contact";
import { ContactCreate } from "../../entities/contact/contact.create";
import { UserEntity } from "../../entities/user/user";
import { MessageInfo } from "../../entities/chat/chat.message";
import { User } from "../../models/user.model";
import { contactRepoImp } from "../../repo/contact/constact.repo";
import { ContactRepo } from "../../repo/contact/interface";
import { UserRepo } from "../../repo/user/interface";
import { userRepoImp } from "../../repo/user/user.repo";
import { Contact } from "../../models/contact.model";

export class UserService {
    private static instance: UserService;

    public static get Instance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    constructor(
        readonly userRepo: UserRepo = userRepoImp,
        readonly contactRepo: ContactRepo = contactRepoImp
    ) {
        //injection
    }
    async findOne(phone: string): Promise<UserEntity>{
        const user = await this.userRepo.findOne(phone)
        if (!user) throw Error(`not found user with ${phone} number`);
        return user

    }

    async addContact(contact: ContactCreate): Promise<contactEntity | undefined> {
        const user = await User.findByPk(contact.user_id);
        if (!user) throw Error(`not found user ${contact.user_id}`);
        try{
            var c =  await this.contactRepo.create(contact);
            console.log("c");
            console.log(c);
            return c
        }
        catch(e){
            console.log(e);
            
        }

    }

    async getContacts(user_id: number): Promise<contactEntity[]> {
        const user = await User.findByPk(user_id);
        if (!user) throw Error(`not found user ${user_id}`);
        return await this.contactRepo.findAll(user_id);
    }
}

const userService = UserService.Instance;
export { userService };
