import CustomError from "../customeError";
import { ErrorHandler } from "../interfaces/errorHandler";

export class CustomErrorHandler implements ErrorHandler {

    constructor(private readonly error: CustomError) { }

    getStatusCode(): number {
        return this.error.statusCode;
    }
    getMassage(): string {
        const massage = this.error.message;
        return massage;
    }

}