"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogException_exception_1 = __importDefault(require("./BlogException.exception"));
class UnAuthorized extends BlogException_exception_1.default {
    constructor(message = 'UnAuthorized') {
        super(message, 'UN_AUTHORIZED', 401);
    }
}
exports.default = UnAuthorized;
