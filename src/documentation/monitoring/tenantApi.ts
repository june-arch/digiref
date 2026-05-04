import { FastifySchema } from "fastify";
import { headerAuth } from "./commonSchema";

const CreateBody =  {
  username: { type: "string" },
  password: { type: "string" },
  role_id: { type: "number" },
}

const AssignBody =  {
  id_admin: { type: "number" },
  id_project_device: { type: "number" },
}

export const TenantCreateSchema: FastifySchema = {
  description: "Tenant",
  tags: ["Tenant"],
  summary: "Tenant",
  body: CreateBody,
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        username: { type: "string" },
        password: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        no_hp: { type: "string" },
        alamat: { type: "string" },
        village_id: { type: "number" },
        postcode_id: { type: "number" },
        role_id: { type: "number" },
      },
    },
  },
};

export const TenantUpdateSchema: FastifySchema = {
  description: "Tenant",
  tags: ["Tenant"],
  summary: "Tenant",
  body: {
    id: { type: 'number'},
    ...CreateBody
  },
  headers: headerAuth,
  response: {
    204: {
      description: "Success",
      type: "null",
    },
  },
};

export const TenantDeleteSchema: FastifySchema = {
  description: "Tenant",
  tags: ["Tenant"],
  summary: "Tenant",
  headers: headerAuth,
  response: {
    200: {
      description: "Success",
      type: "null",
    },
  },
};

export const TenantIndexSchema: FastifySchema = {
  description: "Tenant",
  tags: ["Tenant"],
  summary: "Tenant",
  headers: headerAuth,
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: {
        id: { type: "number" },
        username: { type: "string" },
        password: { type: "string" },
        role_id: { type: "number" },
      },
    },
  },
};

export const TenantShowSchema: FastifySchema = {
  description: "Tenant",
  tags: ["Tenant"],
  summary: "Tenant",
  params: {
    pdId:  { type: "number"}
  },
  headers: headerAuth,
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        username: { type: "string" },
        password: { type: "string" },
        role_id: { type: "number" },
        logo: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        alamat: { type: "string" },
        contact_person: { type: "string" },
        no_hp: { type: "string" },
        province_id: { type: "number" },
        province_name: { type: "string" },
        regency_id: { type: "number" },
        regency_name: { type: "string" },
        district_id: { type: "number" },
        district_name: { type: "string" },
        village_id: { type: "number" },
        village_name: { type: "string" },
        postcode: { type: "string" }

      },
    },
  },
};

export const TenantAssignProjectDeviceSchema: FastifySchema = {
  description: "Tenant",
  tags: ["Tenant"],
  summary: "Tenant",
  body: AssignBody,
  headers: headerAuth,
  response: {
    204: {
      description: "Success",
      type: "null",
    },
  },
};