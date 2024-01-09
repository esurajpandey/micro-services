import client from "../../utils/prisma";
import { ICreateUser } from "./user.interface";

class UserDao {
  public async createUser(params: ICreateUser) {
    return await client.users.create({
      data: {
        email: params.email,
        name: params.name,
        phoneNumber: params.phoneNumber,
        password: params.password,
        role: params.role,
      },
    });
  }

  public async getUserByEmail(email: string) {
    return await client.users.findUnique({
      where: { email },
    });
  }

  public async getUsers() {
    return await client.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
    });
  }
}

export default UserDao;
