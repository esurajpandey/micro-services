import { FastifyReply, FastifyRequest } from "fastify";
import { fmt } from "../../config";
import UserDao from "./user.dao";
import { role_types } from "@prisma/client";
import AccessDenied from "../../exception/AccessDenied.exception";
import { ICreateUser } from "./user.interface";
import bcrypt from "bcrypt";
import BadRequest from "../../exception/BadRequest.exception";

const userDao = new UserDao();
class UserController {
  public async health(request: FastifyRequest, reply: FastifyReply) {
    reply.status(200).send(
      fmt.formatResponse({
        name: "User Service",
        message: "User apis is healthy",
      }),
    );
  }

  public async createUser(
    request: FastifyRequest<{ Body: ICreateUser }>,
    reply: FastifyReply,
  ) {
    const role = request.requestContext.get("role");

    if (role !== role_types.ADMIN) {
      throw new AccessDenied("Only admin can add users");
    }

    const isUserExist = await userDao.getUserByEmail(request.body.email);

    if (isUserExist) {
      throw new BadRequest("User email is already exists");
    }
    const password = await bcrypt.hash(request.body.password, 10);
    const user = await userDao.createUser({
      ...request.body,
      password,
    });
    reply.status(201).send(fmt.formatResponse(user, "user has been added"));
  }
  public async getusers(request: FastifyRequest, reply: FastifyReply) {
    const users = await userDao.getUsers();
    reply.status(200).send(fmt.formatResponse(users, "Users list"));
  }
}

export default UserController;
