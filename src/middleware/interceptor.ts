import { Response, Request, NextFunction } from "express"
import { CustomResponse } from "../utils/responseForm"


export const customInterceptor = async (req: Request, res: Response, next: NextFunction) => {
    const oldSend = res.send;
    res.send = function (data: any) {
        const responseForm = CustomResponse.createResponse(data, res.statusCode);
        res.send = oldSend;
        return res.send(responseForm);
    }
    next();
}

