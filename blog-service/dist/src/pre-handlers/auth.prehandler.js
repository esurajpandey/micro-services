"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPrehandler = void 0;
const gRPC_1 = require("../config/gRPC");
const UnAuthorized_exception_1 = __importDefault(require("../exception/UnAuthorized.exception"));
const authPrehandler = (request, _, next) => {
    var _a;
    const ignorePaths = [/\/health/];
    if (ignorePaths.find(path => path.test(request.url)))
        return next();
    const token = (_a = request.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        throw new UnAuthorized_exception_1.default();
    }
    gRPC_1.authClient.verifyToken({ token }, (error, tokenData) => {
        if (error) {
            new UnAuthorized_exception_1.default((error === null || error === void 0 ? void 0 : error.details) || (error === null || error === void 0 ? void 0 : error.message));
        }
        ;
        request.requestContext.set('userId', tokenData.userId);
        request.requestContext.set('role', tokenData.role);
        request.requestContext.set('email', tokenData.email);
        next();
    });
};
exports.authPrehandler = authPrehandler;
