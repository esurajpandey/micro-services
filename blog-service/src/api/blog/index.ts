import { authPrehandler } from "../../pre-handlers/auth.prehandler";
import blogRoutes from "./blog.routes";

import { FastifyInstance } from "fastify";

export default async (fastify: FastifyInstance) => {
  for (const blogRoute of blogRoutes) {
    if (Array.isArray(blogRoute.preHandler)) {
      blogRoute.preHandler = [authPrehandler, ...blogRoute.preHandler];
    }
    fastify.route(blogRoute);
  }
};
