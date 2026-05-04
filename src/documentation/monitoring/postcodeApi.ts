import { FastifySchema } from "fastify";

export const PostcodeIndexSchema: FastifySchema = {
  description: "Postcode",
  tags: ["Address"],
  summary: "Postcode",
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
      },
    },
  },
};

