import AuthException from "./Auth.exception.js";

class NotFoundException extends AuthException{
    constructor (params) {
        super({
            message : params.message,
            data : params.data,
            status : 404,
            code : 'NOT FOUND'
        })
    }
}

export default NotFoundException;