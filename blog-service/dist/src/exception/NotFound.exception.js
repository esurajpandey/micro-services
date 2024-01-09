"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlogException_exception_1 = __importDefault(require("./BlogException.exception"));
class NotFound extends BlogException_exception_1.default {
    constructor(message = 'Not found') {
        super(message, 'E404', 404);
    }
}
exports.default = NotFound;
