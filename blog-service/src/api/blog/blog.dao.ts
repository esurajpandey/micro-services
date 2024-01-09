import client from "../../utils/prisma";

class BlogDao {
  async createBlog(params: ICreateBlog, userId: string) {
    return await client.blogs.create({
      data: {
        imageUrl: "",
        title: params.title,
        subtitle: params.subtitle,
        tagId: params.tagId,
        userId: userId,
      },
    });
  }
  async createTag(params: ICreateTag) {
    return await client.tags.create({
      data: {
        name: params.name,
      },
    });
  }

  async getTags() {
    return await client.tags.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}

export default BlogDao;
