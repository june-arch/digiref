import { FastifySchema } from "fastify";
import { headerAuth } from "./commonSchema";

const CreateBody =  {
  name: { type: "string" },
  pic: { type: "string" },
  phone: { type: "string" },
  device_id: { type: "number" },
  company_id: { type: "number" },
  project_id: { type: "number" },
  chiller_type_id: { type: "number" },
  address: { type: "string" },
  province_id: { type: "number" },
  regency_id: { type: "number" },
  district_id: { type: "number" },
  village_id: { type: "number" },
}

export const ProjectDeviceCreateSchema: FastifySchema = {
  description: "Project Device",
  tags: ["Project Device"],
  summary: "Project Device",
  body: CreateBody,
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        pic: { type: "string" },
        phone: { type: "string" },
        device_id: { type: "number" },
        company_id: { type: "number" },
        project_id: { type: "number" },
        chiller_type_id: { type: "number" },
        address: { type: "string" },
        province_id: { type: "number" },
        regency_id: { type: "number" },
        district_id: { type: "number" },
        village_id: { type: "number" },
      },
    },
  },
};

export const ProjectDeviceUpdateSchema: FastifySchema = {
  description: "Project Device",
  tags: ["Project Device"],
  summary: "Project Device",
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

export const ProjectDeviceIndexSchema: FastifySchema = {
  description: "Project Device",
  tags: ["Project Device"],
  summary: "Project Device",
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "array",
      properties: {
        id: { type: "number" },
        device_id: { type: "number" },
        timestamp: { type: "string" },
        latitude: { type: "string" },
        longitude: { type: "string" },
        altitude: { type: "string" },
        angle: { type: "number" },
        temperatur: { type: "number" },
        ignition: { type: "number" },
        analog_input: { type: "number" },
        chiller: {
          device_id: {  type: "number" },
          timestamp: {  type: "number" },
          latitude: {  type: "number" },
          longitude: {  type: "number" },
          altitude: {  type: "number" },
          angle: {  type: "number" },
          temperatur: {  type: "number" },
          ignition: {  type: "number" },
          analog_input: {  type: "number" },
          alert: {  type: "bool" },
          color: {  type: "string" },
        }
      },
    },
  },
};

export const ProjectDeviceShowSchema: FastifySchema = {
  description: "Project Device",
  tags: ["Project Device"],
  summary: "Project Device",
  params: {
    pdId:  { type: "number"}
  },
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        device_id: { type: "number" },
        timestamp: { type: "string" },
        latitude: { type: "string" },
        longitude: { type: "string" },
        altitude: { type: "string" },
        angle: { type: "number" },
        temperatur: { type: "number" },
        ignition: { type: "number" },
        analog_input: { type: "number" },
      },
    },
  },
};

export const ProjectDeviceProvinceSchema: FastifySchema = {
  description: "Project Device",
  tags: ["Project Device"],
  summary: "Project Device",
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "object",
      properties: {
        province_id: { type: "number" },
        province: { type: "string" },
      },
    },
  },
};

export const ProjectDeviceUploadGambarSchema: FastifySchema = {
  description: "Project Device",
  tags: ["Project Device"],
  summary: "Project Device",
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
      },
    },
  },
};