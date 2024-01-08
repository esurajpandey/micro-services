"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rTracerPlugin = void 0;
const cls_rtracer_1 = __importDefault(require("cls-rtracer"));
const config_1 = require("../config");
const logger = require('pino')({
    level: config_1.config.env === 'TEST' ? 'error' : 'info',
    mixin() {
        return { reqId: cls_rtracer_1.default.id() };
    },
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname,reqId',
            messageFormat: '[{reqId}]: {msg}',
            colorize: false,
            destination: './log/logs.log',
        },
    },
    serializers: {
        req(request) {
            let body = undefined;
            if (request.body && request.headers['content-type'] == 'application/json')
                body = request.body;
            return {
                method: request.method,
                url: request.url,
                body,
                ip: request.ip,
                ips: request.ips,
            };
        },
    },
});
exports.default = logger;
exports.rTracerPlugin = cls_rtracer_1.default.fastifyPlugin;
