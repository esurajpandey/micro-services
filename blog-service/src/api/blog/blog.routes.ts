import { API_METHODS } from "../../interface/api.interface";
import { IRouteOptions } from "../../interface/fastify.interface";
import BlogController from "./blog.controller";

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
];

export default blogRoutes;
