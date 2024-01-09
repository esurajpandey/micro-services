import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import logger from "../../utils/logger";
const uptime = Date.now();

export default async (fastify: FastifyInstance) => {
  fastify.get(
    "/",
    {
      schema: {
        description: "Api endpoint for health check",
        tags: ["health"],
        summary: "health check api",
        response: {
          200: {
            description: "success response",
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
              uptime: { type: "number" },
            },
          },
        },
      },
    },
    async (_: FastifyRequest, reply: FastifyReply) => {
      logger.info("Health Check");
      const healthResponse = {
        success: true,
        message: "Health check successful",
        uptime,
      };
      reply.status(200).send(healthResponse);
    },
  );
};
