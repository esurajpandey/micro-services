"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiConfig = exports.swaggerConfig = void 0;
exports.swaggerConfig = {
    swagger: {
        info: {
            title: 'Blog Service',
            description: 'Blog Service swagger API',
            version: '0.1.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here',
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {
                name: 'health',
                description: 'health check endpoint',
            },
            {
                name: 'blog',
                description: 'blog endpoints',
            },
        ],
    },
};
exports.swaggerUiConfig = {
    routePrefix: '/blog-service',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
    },
    staticCSP: true,
};
