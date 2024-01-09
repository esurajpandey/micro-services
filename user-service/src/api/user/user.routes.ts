import { API_METHODS } from "../../interface/api.interface";
import { IRouteOptions } from "../../interface/fastify.interface";
import UserController from "./user.controller";
import { createUserSchema, getUserSchema } from "./user.schema";

const userController = new UserController();

const userRoutes: IRouteOptions<{
  Params: any;
  Body: any;
  Querystring: any;
}>[] = [
  {
    handler: userController.health,
    method: API_METHODS.GET,
    url: "/check",
    preHandler: [],
  },
  {
    handler: userController.createUser,
    method: API_METHODS.POST,
    url: "/",
    schema: createUserSchema,
    preHandler: [],
  },
  {
    handler: userController.getusers,
    method: API_METHODS.GET,
    url: "/",
    schema: getUserSchema,
    preHandler: [],
  },
];

export default userRoutes;
