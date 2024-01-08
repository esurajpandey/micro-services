"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const crypto_util_1 = require("./crypto.util");
class Formatter {
    constructor() {
        this.formatError = (error) => {
            const status = error.status || 500;
            const message = error.message || 'Something went wrong';
            const code = error.code || 'E500';
            const data = error.data || null;
            const success = false;
            return {
                status,
                message,
                data,
                success,
                code,
            };
        };
        this.formatResponse = (result, message) => {
            let data = null;
            let success = false;
            const code = 'S200';
            data = result;
            success = true;
            const response = {
                data,
                message: message ? message : '',
                success,
                code,
            };
            return response;
        };
        this.getSwaggerResponse = (data) => {
            return {
                data,
                message: { type: 'string' },
                success: { type: 'boolean' },
                code: { type: 'string' },
            };
        };
        this.formatFileUrl = (filePath, hostedPath) => {
            const path = filePath.split('/docs');
            return `${hostedPath}${path.pop()}`;
        };
        this.formatMulterFileName = (_, file, callback) => {
            const hash = (0, crypto_util_1.generateRandomHash)();
            const fileExtension = path_1.default.extname(file.originalname);
            callback(null, `${hash}${fileExtension}`);
        };
        this.getSwaggerErrorResponse = (errorCode, description) => {
            return {
                description,
                type: 'object',
                properties: {
                    statusCode: {
                        type: 'number',
                        enum: [errorCode],
                    },
                    code: { type: 'string' },
                    error: { type: 'string' },
                    message: { type: 'string' },
                },
            };
        };
    }
}
exports.default = Formatter;
