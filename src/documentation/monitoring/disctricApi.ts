import { FastifySchema } from "fastify";

export const DistrictIndexSchema: FastifySchema = {
  description: "District",
  tags: ["Address"],
  summary: "District",
  params: {
    regencyId: { type: "number" },
  },
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: {
        id: { type: "number" },
        regency_id: { type: "number" },
        name: { type: "string" },
      },
    },
  },
};

export const DistrictShowSchema: FastifySchema = {
  description: "District",
  tags: ["Address"],
  summary: "District",
  params: {
    districId: { type: "number" },
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        regency_id: { type: "number" },
        name: { type: "string" },
      },
    },
  },
};
