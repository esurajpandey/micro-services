"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomException extends Error {
    constructor(message, code = 'CUSTOM_EXCEPTION', status) {
        super(message);
        this.success = false,
            this.code = code;
        this.message = message;
        this.status = status || 500;
    }
}
exports.default = CustomException;
