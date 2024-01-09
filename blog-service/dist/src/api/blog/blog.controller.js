"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const blog_dao_1 = __importDefault(require("./blog.dao"));
const blogDao = new blog_dao_1.default();
class BlogController {
    async health(request, reply) {
        reply.status(200).send(config_1.fmt.formatResponse({
            name: "Suraj Pandey",
            message: 'It done',
        }));
    }
    async createBlog(request, reply) {
        // const userId = request.requestContext.get('userId');
    }
    async createTag(request, reply) {
        const tag = await blogDao.createTag(request.body);
        reply.status(200).send(config_1.fmt.formatResponse(tag, 'Tag has been added'));
    }
    async getTags(request, reply) {
        const tags = await blogDao.getTags();
        reply.status(200).send(config_1.fmt.formatResponse(tags, 'All tags'));
    }
}
exports.default = BlogController;
