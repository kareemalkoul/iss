import {
    UserTokenPayload,
    TokenizedUser,
} from "../../entities/user/user.token";
import jwt from "jsonwebtoken";
import config from "config";
import { UserEntity } from "../../entities/user/user";

export function generateToken(user: UserEntity): TokenizedUser {
    const UserTokenPayload: UserTokenPayload = {
        _id: user.id,
        phone: user.phone,
    };
    const token = jwt.sign(UserTokenPayload, config.get("token.jwtScretKey"), {
        expiresIn: config.get("token.expireIn"),
    });
    return {
        user_name: user.user_name,
        phone: user.phone,
        token,
    };
}
