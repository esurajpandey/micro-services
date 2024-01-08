"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(env) {
        this.env = env.NODE_ENV || 'DEVELOPMENT';
        this.appPort = this.getNumberValue(env.APP_PORT);
        this.authGrpc = env.AUTH_GRPC || '';
        this.jwtSecret = env.JWT_SECRET || '';
        this.baseUrl = env.BASE_URL || '';
    }
    getNumberValue(value) {
        return Number(value);
    }
}
exports.default = Config;
