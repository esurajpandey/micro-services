"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_interface_1 = require("../../interface/api.interface");
const blog_controller_1 = __importDefault(require("./blog.controller"));
const blogController = new blog_controller_1.default();
const blogRoutes = [
    {
        handler: blogController.health,
        method: api_interface_1.API_METHODS.GET,
        url: '/check',
        preHandler: [],
    }
];
exports.default = blogRoutes;
