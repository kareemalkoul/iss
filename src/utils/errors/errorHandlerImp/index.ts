//abstract Factory Pattern

import { ValidationError as SequelizeValidationError } from "sequelize";
import CustomError from "../customeError";
import { ErrorHandler } from "../interfaces/errorHandler";
import { CommonErrorHandler } from "./commonErrorHandler";
import { CustomErrorHandler } from "./customErrorHandler";
import { SequelizeErrorHandler } from "./sequelizeErrorHandler";


export class FactoryErrorHandler {

    static createErrorHandler(error: Error): ErrorHandler {

        if (error instanceof CustomError) return new CustomErrorHandler(error)

        if (error instanceof SequelizeValidationError) return new SequelizeErrorHandler(error)

        return new CommonErrorHandler(error)

    }

}