import { UserEntity } from "../../entities/user/user";
import { UserLogin } from "../../entities/user/user.login";
import { UserSignUp } from "../../entities/user/user.signup";
import { UserRepo } from "../../repo/user/interface";
import { userRepoImp } from "../../repo/user/user.repo";


export class UserService {
    private static instance: UserService;

    public static get Instance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    constructor(readonly userRepo: UserRepo = userRepoImp) {
        //injection 
    }

    async login(userLogin: UserLogin): Promise<UserEntity> {
        const user = await this.userRepo.findOne(userLogin.phone);
        if (!user)
            throw Error(`not found ${userLogin.phone}`);

        const checked = user.checkPassword(userLogin.password)
        if (!checked)
            throw Error(`not correct ${userLogin.phone} with password`);

        return user;
    }

    async siginup(userSignUp: UserSignUp): Promise<UserEntity> {
        const user = await this.userRepo.create(userSignUp);
        return user;
    }

}

const userService = UserService.Instance
export { userService };
