import session from "express-session";

export const sessionMiddleware = session({
    secret: "keyboard cat"
});
