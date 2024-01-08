"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const uptime = Date.now();
exports.default = async (fastify) => {
    fastify.get('/', {
        schema: {
            description: 'Api endpoint for health check',
            tags: ['health'],
            summary: 'health check api',
            response: {
                200: {
                    description: 'success response',
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                        uptime: { type: 'number' },
                    },
                },
            },
        },
    }, async (_, reply) => {
        logger_1.default.info('Health Check');
        const healthResponse = {
            success: true,
            message: 'Health check successful',
            uptime,
        };
        reply.status(200).send(healthResponse);
    });
};
