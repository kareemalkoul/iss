
import { NextFunction, Request, Response } from "express";
import StatusCode from "./statusCode";
import { FactoryErrorHandler } from "./errorHandlerImp";
import { ErrorHandler } from "./interfaces/errorHandler";



export default class CustomError extends Error {
    declare statusCode: StatusCode;

    constructor(errormassage: string, statusCode: StatusCode = StatusCode.ServerError) {
        super(errormassage);
        this.statusCode = statusCode
    }

    //Open-closed principle with Abstract Factory and interfaces 
    static errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
        const errorHandler: ErrorHandler = FactoryErrorHandler.createErrorHandler(err);
        const statusCode = errorHandler.getStatusCode();
        const massage = errorHandler.getMassage();

        res.status(statusCode).send(massage);
    }

}