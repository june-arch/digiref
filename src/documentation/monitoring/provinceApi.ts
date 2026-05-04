import { FastifySchema } from "fastify";

export const ProvinceIndexSchema: FastifySchema = {
  description: "Province",
  tags: ["Address"],
  summary: "Province",
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
      },
    },
  },
};

export const ProvinceShowSchema: FastifySchema = {
  description: "Province",
  tags: ["Address"],
  summary: "Province",
  params: {
    deviceId: { type: "number" },
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
      },
    },
  },
};
