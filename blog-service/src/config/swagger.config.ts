import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerConfig: SwaggerOptions = {
  swagger: {
    info: {
      title: "Blog Service",
      description: "Blog Service swagger API",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      {
        name: "health",
        description: "health check endpoint",
      },
      {
        name: "blog",
        description: "blog endpoints",
      },
    ],
  },
};

export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: "/blog-service",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  staticCSP: true,
};
