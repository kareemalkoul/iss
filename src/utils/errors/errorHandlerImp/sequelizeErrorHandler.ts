import { ValidationError } from "sequelize";
import { ErrorHandler } from "../interfaces/errorHandler";
import StatusCode from "../statusCode";

export class SequelizeErrorHandler implements ErrorHandler {

    constructor(private error: ValidationError) { }

    getStatusCode(): number {
        return StatusCode.ServerError;
    }

    getMassage(): string {
        return (this.error as any).original.sqlMessage
    }

    getMassageAr() {
        if ((this.error as any).original.code == "ER_DUP_ENTRY")
            return `${(this.error as any).errors[0].value} تكرار بالـ  `
        return (this.error as any).original.sqlMessage
    }

}