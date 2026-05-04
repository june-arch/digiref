import { FastifySchema } from "fastify";

export const VillageIndexSchema: FastifySchema = {
  description: "Vilage",
  tags: ["Address"],
  summary: "Vilage",
  params: {
    districtId: { type: "number" },
  },
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: {
        id: { type: "number" },
        district_id: { type: "number" },
        postcode: { type: "number" },
        name: { type: "string" },
      },
    },
  },
};

