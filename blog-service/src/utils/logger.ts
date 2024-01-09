import rTracer from "cls-rtracer";
import { FastifyRequest } from "fastify";
import { config } from "../config";
const logger = require("pino")({
  level: config.env === "TEST" ? "error" : "info",
  mixin() {
    return { reqId: rTracer.id() };
  },
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "yyyy-mm-dd HH:MM:ss",
      ignore: "pid,hostname,reqId",
      messageFormat: "[{reqId}]: {msg}",
      colorize: false,
      destination: "./log/logs.log",
    },
  },
  serializers: {
    req(request: FastifyRequest) {
      let body = undefined;
      if (request.body && request.headers["content-type"] == "application/json")
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

export default logger;
export const rTracerPlugin = rTracer.fastifyPlugin;
