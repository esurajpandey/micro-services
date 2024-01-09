import { authClient } from "../config/gRPC";
import {
  FastifyError,
  FastifyReply,
  FastifyRequest,
  preHandlerHookHandler,
} from "fastify";
import UnAuthorized from "../exception/UnAuthorized.exception";

export const authPrehandler: preHandlerHookHandler = (
  request: FastifyRequest,
  _: FastifyReply,
  next: (_error?: FastifyError) => void,
) => {
  const ignorePaths = [/\/health/];
  if (ignorePaths.find((path) => path.test(request.url))) return next();
  const token = request.headers["authorization"]?.split(" ")[1] as string;

  if (!token) {
    throw new UnAuthorized();
  }
  authClient.verifyToken({ token }, (error: any, tokenData: any) => {
    if (error) {
      new UnAuthorized(error?.details || error?.message);
    }
    request.requestContext.set("userId", tokenData.userId);
    request.requestContext.set("role", tokenData.role);
    request.requestContext.set("email", tokenData.email);
    next();
  });
};
