import { role_types } from "@prisma/client";

export interface ICreateUser {
  name: string;
  email: string;
  phoneNumber: string;
  role: role_types;
  password: string;
}
