"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlogException extends Error {
    constructor(message = 'Something went wrong!', code = 'E500', status) {
        super(message);
        this.success = false,
            this.code = code;
        this.message = message;
        this.status = status || 500;
    }
}
exports.default = BlogException;
