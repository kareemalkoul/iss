import { UserEntity } from "../../entities/user/user";
import { UserLogin } from "../../entities/user/user.login";
import { UserSignUp } from "../../entities/user/user.signup";
import { UserRepo } from "../../repo/user/interface";
import { userRepoImp } from "../../repo/user/user.repo";
import {
    TokenizedUser,
    UserTokenPayload,
} from "../../entities/user/user.token";
import { generateToken } from "../../utils/shared/authUtils";

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

    async login(userLogin: UserLogin): Promise<TokenizedUser> {
        const user = await this.userRepo.findOne(userLogin.phone);
        if (!user) throw Error(`not found ${userLogin.phone}`);

        const checked = user.checkPassword(userLogin.password);
        if (!checked)
            throw Error(`not correct ${userLogin.phone} with password`);

        const tokenizedUser = generateToken(user);

        return tokenizedUser;
    }

    async siginup(userSignUp: UserSignUp): Promise<TokenizedUser> {
        const user = await this.userRepo.create(userSignUp);
        const tokenizedUser = generateToken(user);

        return tokenizedUser;
    }
}

const authService = AuthService.Instance;
export { authService };
