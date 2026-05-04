import { FastifySchema } from "fastify";
import { headerAuth } from "./commonSchema";

export const ComapnyCreateSchema: FastifySchema = {
  description: "Company",
  tags: ["Company"],
  summary: "Company",
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

export const ComapnyIndexSchema: FastifySchema = {
  description: "Company",
  tags: ["Company"],
  summary: "Company",
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

export const ComapnyShowSchema: FastifySchema = {
  description: "Company",
  tags: ["Company"],
  params: {
    companyId: { type: "string" }
  },
  summary: "Company",
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

