import { User } from "../../entities/user/user"
import { UserLogin } from "../../entities/user/user.login"
import { UserSignUp } from "../../entities/user/user.signup"


export interface UserRepo {
    findOne(phone: string): Promise<User | null>
    create(user: UserSignUp): Promise<User>
}