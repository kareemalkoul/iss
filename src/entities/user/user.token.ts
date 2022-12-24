export type UserTokenPayload = {
    _id: number;
    phone: string;
};

export type TokenizedUser = {
    user_name: string;
    phone: string;
    token: string;
};
