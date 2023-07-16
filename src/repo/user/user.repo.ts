import { UserLogin } from "../../entities/user/user.login";
import { UserSignUp } from "../../entities/user/user.signup";
import { User } from "../../models/user.model";
import { UserRepo } from "./interface";

class UserRepoImp implements UserRepo {
    private static instance: UserRepoImp;
    public static get Instance(): UserRepoImp {
        if (!UserRepoImp.instance) {
            UserRepoImp.instance = new UserRepoImp();
        }
        return UserRepoImp.instance;
    }

    constructor() {

    }

    async create(user: UserSignUp): Promise<User> {
        const userCreated = await User.create(user);
        return userCreated.toJSON();
    }

    async findOne(phone: string): Promise<User | null> {
        const userChecked = await User.findOne({
            where: {
                phone: phone,
            }
        });
        return userChecked;
    }
}

const userRepoImp = UserRepoImp.Instance

export { userRepoImp }


