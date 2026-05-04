import { FastifySchema } from "fastify";
import { headerAuth } from "./commonSchema";

export const ProjectCreateSchema: FastifySchema = {
  description: "Project",
  tags: ["Project"],
  summary: "Project",
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

export const ProjectIndexSchema: FastifySchema = {
  description: "Project",
  tags: ["Project"],
  summary: "Project",
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

export const ProjectShowSchema: FastifySchema = {
  description: "Project",
  tags: ["Project"],
  params: {
    projectId: { type: "number" }
  },
  summary: "Project",
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

