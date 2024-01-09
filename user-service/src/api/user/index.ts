import { authPrehandler } from "../../pre-handlers/auth.prehandler";
import userRoutes from "./user.routes";

import { FastifyInstance } from "fastify";

export default async (fastify: FastifyInstance) => {
  for (const userRoute of userRoutes) {
    if (Array.isArray(userRoute.preHandler)) {
      userRoute.preHandler = [authPrehandler, ...userRoute.preHandler];
    }
    fastify.route(userRoute);
  }
};
