import { ErrorHandler } from "../interfaces/errorHandler";
import StatusCode from "../statusCode";

export class CommonErrorHandler implements ErrorHandler {

    constructor(private readonly error: Error) { }

    getStatusCode(): number {
        return StatusCode.ServerError;
    }

    getMassage(): string {
        return this.error.message
    }

}