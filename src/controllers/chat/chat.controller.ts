import { RequestHandler, Response, Request } from "express"

export const loginController: RequestHandler = async (req, res) => {

    res.send("login")

}

export const signupController: RequestHandler = async (req, res) => {

    res.send("signup")

}

