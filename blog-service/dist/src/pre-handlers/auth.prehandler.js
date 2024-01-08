"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPrehandler = void 0;
const gRPC_1 = require("../config/gRPC");
const authPrehandler = (request, _, 
// eslint-disable-next-line no-unused-vars
next) => {
    const ignorePaths = [/\/health/];
    if (ignorePaths.find(path => path.test(request.url)))
        return next();
    // const token = request.headers.cookie?.match(/token=(.*?)(;|$)/)?.[1] || '';
    const token = 'Suraj is my name';
    gRPC_1.authClient.verifyToken({ token }, (error, tokenData) => {
        if (error) {
            console.log({ Error: `Error  : ${error}` });
        }
        ;
        // request.requestContext.set('userId', tokenData.userId);
        // request.requestContext.set('tokenData', tokenData);
        console.log({ tokenData });
        next();
    });
};
exports.authPrehandler = authPrehandler;
