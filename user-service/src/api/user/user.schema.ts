import { fmt } from "../../config";

export const getUserSchema = {
  description: "Api to fetch the all user",
  tags: ["user", "fetch"],
  summary: "fetch user api",
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: fmt.getSwaggerResponse({
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: {
              type: "string",
            },
            role: {
              type: "string",
            },
            phoneNumber: {
              type: "string",
            },
            additionalProperties: true,
          },
        },
      }),
    },
  },
};

export const createUserSchema = {
  description: "Api to create the user",
  tags: ["user", "create"],
  summary: "create user api",
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: {
        type: "string",
      },
      phoneNumber: {
        type: "string",
      },
      password: { type: "string" },
      role: { type: "string" },
    },
    required: ["name", "email", "phoneNumber", "password", "role"],
  },
};
