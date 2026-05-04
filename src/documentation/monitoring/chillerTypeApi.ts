import { FastifySchema } from "fastify";
import { headerAuth } from "./commonSchema";

export const ChillerTypeCreateSchema: FastifySchema = {
  description: "Chiller Type",
  tags: ["Chiller Type"],
  summary: "Chiller Type",
  body: {
    name: { type: "string" },
  },
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" }
      },
    },
  },
};

export const ChillerTypeIndexSchema: FastifySchema = {
  description: "Chiller Type",
  tags: ["Chiller Type"],
  summary: "Chiller Type",
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "array",
      properties: {
        id: { type: "number" },
        name: { type: "string" }
      },
    },
  },
};

export const ChillerTypeSchema: FastifySchema = {
  description: "Chiller Type",
  tags: ["Chiller Type"],
  summary: "Chiller Type",
  params: {
    chillerTypeId: { type: "number" }
  },
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" }
      },
    },
  },
};

