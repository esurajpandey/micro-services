import { FastifyReply, FastifyRequest } from "fastify";
import { fmt } from "../../config";
import BlogDao from "./blog.dao";
import { role_types } from "@prisma/client";
import AccessDenied from "../../exception/AccessDenied.exception";

const blogDao = new BlogDao();
class BlogController {
  public async health(request: FastifyRequest, reply: FastifyReply) {
    reply.status(200).send(
      fmt.formatResponse({
        name: "Blog Service",
        message: "Blog apis is healthy",
      }),
    );
  }

  public async createBlog(
    request: FastifyRequest<{ Body: ICreateBlog }>,
    reply: FastifyReply,
  ) {
    const userId = request.requestContext.get('userId');
    const role = request.requestContext.get('role');
    console.log({role});
    if (role !== role_types.ADMIN){
      throw new AccessDenied('Only admin can create blog');
    }
    const blog = await blogDao.createBlog(request.body,userId);
    reply.status(201).send(fmt.formatResponse(blog,'Blog has been added'));
  }

  public async createTag(
    request: FastifyRequest<{ Body: ICreateTag }>,
    reply: FastifyReply,
  ) {
    const tag = await blogDao.createTag(request.body);
    reply.status(200).send(fmt.formatResponse(tag, "Tag has been added"));
  }

  public async getTags(request: FastifyRequest, reply: FastifyReply) {
    const tags = await blogDao.getTags();
    reply.status(200).send(fmt.formatResponse(tags, "All tags"));
  }

  public async getBlogs(request: FastifyRequest, reply: FastifyReply){
    const blogs = await blogDao.getBlogs();
    reply.status(200).send(fmt.formatResponse(blogs, "All Blogs"));
  }
}

export default BlogController;
