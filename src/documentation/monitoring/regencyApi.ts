import { FastifySchema } from "fastify";

export const RegencyIndexSchema: FastifySchema = {
  description: "Regency",
  tags: ["Address"],
  summary: "Regency",
  params: {
    provinceId: { type: "number" },
  },
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: {
        id: { type: "number" },
        province_id: { type: "number" },
        name: { type: "string" },
      },
    },
  },
};

export const RegencyShowSchema: FastifySchema = {
  description: "Regency",
  tags: ["Address"],
  summary: "Regency",
  params: {
    regencyId: { type: "number" },
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        province_id: { type: "number" },
        name: { type: "string" },
      },
    },
  },
};
