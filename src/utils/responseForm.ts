
type ResponseForm = {
    msg: string
    status: boolean
    data: any
    code: number
}

export class CustomResponse {

    private constructor() {

    }
    static successfulCode = [200, 201];

    private static abstractCreateResponse(data: any, status = true, msg = "", code = 200): ResponseForm {
        return {
            data: data,
            status: status,
            msg: msg,
            code: code
        }
    }

    static createResponse(data: any, code: number): ResponseForm {
        const createResponse = CustomResponse.successfulCode.includes(code) ? CustomResponse.createSuccessfulResponse : CustomResponse.createErrorResponse
        return createResponse(data, code)
    }

    private static createErrorResponse(msg: any, code: number): ResponseForm {
        return CustomResponse.abstractCreateResponse({}, false, msg, code);
    }

    private static createSuccessfulResponse(data: any, code: number): ResponseForm {
        return CustomResponse.abstractCreateResponse(data, true, "", code);
    }
}


