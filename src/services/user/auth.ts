import { UserEntity } from "../../entities/user/user";
import { UserLogin } from "../../entities/user/user.login";
import { UserSignUp } from "../../entities/user/user.signup";
import { UserRepo } from "../../repo/user/interface";
import { userRepoImp } from "../../repo/user/user.repo";

export class AuthService {
    private static instance: AuthService;

    public static get Instance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    constructor(readonly userRepo: UserRepo = userRepoImp) {
        //injection
    }

    async login(userLogin: UserLogin): Promise<UserEntity> {
        const user = await this.userRepo.findOne(userLogin.phone);
        if (!user) throw Error(`not found ${userLogin.phone}`);

        const checked = user.checkPassword(userLogin.password);
        if (!checked)
            throw Error(`not correct ${userLogin.phone} with password`);

        // const tokenizedUser = generateToken(user);

        return user;
    }

    async siginup(userSignUp: UserSignUp): Promise<UserEntity> {
        const user = await this.userRepo.create(userSignUp);
        // const tokenizedUser = generateToken(user);
        return user;
    }
}

const authService = AuthService.Instance;
export { authService };
