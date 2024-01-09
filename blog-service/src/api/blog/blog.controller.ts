import { FastifyReply, FastifyRequest } from "fastify";
import { fmt } from "../../config";
import BlogDao from "./blog.dao";

const blogDao = new BlogDao();
class BlogController {
  public async health(request: FastifyRequest, reply: FastifyReply) {
    reply.status(200).send(
      fmt.formatResponse({
        name: "Suraj Pandey",
        message: "It done",
      }),
    );
  }

  public async createBlog(
    request: FastifyRequest<{ Body: ICreateBlog }>,
    reply: FastifyReply,
  ) {
    // const userId = request.requestContext.get('userId');
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
}

export default BlogController;
