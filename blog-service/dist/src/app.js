"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const path_1 = __importDefault(require("path"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const cors_1 = __importDefault(require("@fastify/cors"));
const request_context_1 = __importDefault(require("@fastify/request-context"));
const logger_1 = __importStar(require("./utils/logger"));
const config_1 = require("./config");
const swagger_config_1 = require("./config/swagger.config");
const fastify_multer_1 = __importDefault(require("fastify-multer"));
const prisma_1 = __importDefault(require("./utils/prisma"));
class App {
    constructor(opts) {
        this.fastifyInstance = (0, fastify_1.default)(opts);
        this.initializeErrorHandler();
        this.initializeSwagger();
        this.initializePreHandlers();
        this.initializeRoutes();
    }
    get log() {
        return this.fastifyInstance.log;
    }
    initializeRoutes() {
        this.fastifyInstance.register(autoload_1.default, {
            dir: path_1.default.join(__dirname, 'api'),
            options: { prefix: '/blog-service' },
        });
    }
    initializeErrorHandler() {
        /* eslint-disable-next-line no-unused-vars */
        this.fastifyInstance.setErrorHandler((error, request, reply) => {
            logger_1.default.info({ error: error.stack || error });
            const errorFormatted = config_1.fmt.formatError(error);
            const { status, ...errorResponse } = errorFormatted;
            reply.status(status).send(errorResponse);
        });
    }
    initializeSwagger() {
        this.fastifyInstance.register(swagger_1.default, swagger_config_1.swaggerConfig);
        this.fastifyInstance.register(swagger_ui_1.default, swagger_config_1.swaggerUiConfig);
    }
    connectPrisma() {
        this.fastifyInstance.addHook('onClose', () => {
            // redisClient.end(); //letter for caching
            prisma_1.default.$disconnect();
        });
        return prisma_1.default.$connect();
    }
    getFastifyInstance() {
        return this.fastifyInstance;
    }
    listen(opts, callback) {
        this.fastifyInstance.listen(opts, callback);
    }
    initializePreHandlers() {
        this.fastifyInstance.register(fastify_multer_1.default.contentParser);
        this.fastifyInstance.register(cors_1.default, {
            origin: ['http://localhost:3000', config_1.config.baseUrl],
            credentials: true,
        });
        this.fastifyInstance.register(request_context_1.default, {
            defaultStoreValues: {
                userId: null,
                email: null,
                name: null,
                role: null,
            },
        });
        this.fastifyInstance.register(logger_1.rTracerPlugin, {
            echoHeader: true,
            useFastifyRequestId: true,
        });
    }
}
exports.default = App;
