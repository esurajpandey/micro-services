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

  async getBlogs() {
    return await client.blogs.findMany({
      select: {
        id: true,
        createdAt: true,
        imageUrl: true,
        subtitle: true,
        tag: {
          select: {
            name: true,
            id: true,
          },
        },
        title: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}

export default BlogDao;
