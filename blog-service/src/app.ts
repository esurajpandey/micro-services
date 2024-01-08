import fastify, { FastifyInstance, FastifyListenOptions, FastifyServerOptions } from 'fastify';
import Autoload from '@fastify/autoload';
import path from 'path';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import fastifyRequestContext from '@fastify/request-context';
import logger, { rTracerPlugin } from './utils/logger';
import { config, fmt } from './config';
import { swaggerConfig, swaggerUiConfig } from './config/swagger.config';
import multer from 'fastify-multer';
import client from './utils/prisma';

type ListenCallbackFunction = (error: Error | null, address: string) => void;
type IContext = { [key: string]: any };

class App{
    private fastifyInstance: FastifyInstance;
    private contextData: IContext = { userId: null, blogId: null };

    constructor(opts: FastifyServerOptions, context?: IContext) {
		this.fastifyInstance = fastify(opts);
		this.initializeSwagger();
		if (context) this.contextData = context;    
		this.initializeErrorHandler();
		this.initializePreHandlers();
		this.initializeRoutes();
	}

    public get log() {
		return this.fastifyInstance.log;
	}

    private initializeRoutes() {
		this.fastifyInstance.register(Autoload, {
			dir: path.join(__dirname, 'api'),
			options: { prefix: '/blog-service' },
		});
	}

    private initializeErrorHandler() {
		/* eslint-disable-next-line no-unused-vars */
		this.fastifyInstance.setErrorHandler((error, request, reply) => {
			logger.info({ error: error.stack || error });
			const errorFormatted = fmt.formatError(error);
			const { status, ...errorResponse } = errorFormatted;
			reply.status(status).send(errorResponse);
		});
	}

    private initializeSwagger() {
		this.fastifyInstance.register(fastifySwagger, swaggerConfig);
		this.fastifyInstance.register(fastifySwaggerUI, swaggerUiConfig);
	}

    public connectPrisma() {
        this.fastifyInstance.addHook('onClose', () => {
			// redisClient.end(); //letter for caching
			client.$disconnect();
		});
		return client.$connect();
    }
    public getFastifyInstance() {
		return this.fastifyInstance;
	}

    public listen(opts: FastifyListenOptions, callback: ListenCallbackFunction) {
		this.fastifyInstance.listen(opts, callback);
	}

    private initializePreHandlers() {
        this.fastifyInstance.register(multer.contentParser);
        this.fastifyInstance.register(fastifyRequestContext, {
			defaultStoreValues: this.contextData,
		});
        this.fastifyInstance.register(cors, {
			origin: ['http://localhost:3000', config.baseUrl],
			credentials: true,
		});
        this.fastifyInstance.register(rTracerPlugin, {
			echoHeader: true,
			useFastifyRequestId: true,
		});
    }
}
export default App;
