
class AuthException  extends Error {
    constructor (params) {
        super(params?.message || 'Auth exception');
        this.status = params?.status || 500;
        this.data = params?.data || null;
        this.message = params?.message || 'Something went wrong!';
        this.success = false;
        this.code = 'E500'
    }
}

export default AuthException;