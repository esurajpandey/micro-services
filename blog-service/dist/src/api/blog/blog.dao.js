"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../utils/prisma"));
class BlogDao {
    async createBlog(params, userId) {
        return await prisma_1.default.blogs.create({
            data: {
                imageUrl: '',
                title: params.title,
                subtitle: params.subtitle,
                tagId: params.tagId,
                userId: userId,
            }
        });
    }
    async createTag(params) {
        return await prisma_1.default.tags.create({
            data: {
                name: params.name
            }
        });
    }
    async getTags() {
        return await prisma_1.default.tags.findMany({
            select: {
                id: true,
                name: true,
            }
        });
    }
}
exports.default = BlogDao;
