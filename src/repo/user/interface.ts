import { UserEntity } from "../../entities/user/user"
import { UserSignUp } from "../../entities/user/user.signup"


export interface UserRepo {
    findOne(phone: string): Promise<UserEntity | null>
    create(user: UserSignUp): Promise<UserEntity>
}