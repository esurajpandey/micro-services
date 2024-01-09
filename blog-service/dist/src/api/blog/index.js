"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_prehandler_1 = require("../../pre-handlers/auth.prehandler");
const blog_routes_1 = __importDefault(require("./blog.routes"));
exports.default = async (fastify) => {
    for (const blogRoute of blog_routes_1.default) {
        if (Array.isArray(blogRoute.preHandler)) {
            blogRoute.preHandler = [auth_prehandler_1.authPrehandler, ...blogRoute.preHandler];
        }
        fastify.route(blogRoute);
    }
};
