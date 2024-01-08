import AuthException from "./Auth.exception.js";

class CustomException extends AuthException {
    constructor(params) {
        super({
            ...params,
            code : 'CUSTOM_ERROR',
            status : 400,
        })
    }
}

export default CustomException;