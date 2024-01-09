import { API_METHODS } from "../../interface/api.interface";
import { IRouteOptions } from "../../interface/fastify.interface";
import BlogController from "./blog.controller";
import { createBlogsSchema, getBlogsSchema, getTagsSchema } from "./blog.schema";

const blogController = new BlogController();

const blogRoutes: IRouteOptions<{
  Params: any;
  Body: any;
  Querystring: any;
}>[] = [
  {
    handler: blogController.health,
    method: API_METHODS.GET,
    url: "/check",
    preHandler: [],
  },
  {
    handler: blogController.createTag,
    method: API_METHODS.POST,
    url: "/tag",
    preHandler: [],
  },
  {
    handler: blogController.createBlog,
    method: API_METHODS.POST,
    url: "/blog",
    schema : createBlogsSchema,
    preHandler: [],
  },
  {
    handler: blogController.getTags,
    method: API_METHODS.GET,
    url: "/tag",
    schema : getTagsSchema,
    preHandler: [],
  },
  {
    handler: blogController.getBlogs,
    method: API_METHODS.GET,
    url: "/blog",
    schema : getBlogsSchema,
    preHandler: [],
  },
];

export default blogRoutes;
