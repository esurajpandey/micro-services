class BadRequest extends Error{
    constructor(message,code=400){
        super(message);
        this.message = message;
        this.code = code;
    }
}

export default BadRequest;