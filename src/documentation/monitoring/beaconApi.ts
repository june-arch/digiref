import { FastifySchema } from "fastify";
import { headerAuth } from "./commonSchema";

const beaconPropertiesSchema = {
  device_id: { type: "number" },
  device_name: { type: "string" },
  timestamp: { type: "string" },
  longitude: { type: "string" },
  latitude: { type: "string" },
  altitude: { type: "string" },
  angle: { type: "string" },
  temperatur: { type: "string" },
  ignition: { type: "string" },
  analogInput: { type: "string" },
};
export const BeaconIndexSchema: FastifySchema = {
  description: "Beacon Latest Data",
  tags: ["Beacon"],
  summary: "Beacon Latest Data",
  headers: headerAuth,
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: beaconPropertiesSchema,
    },
  },
};

export const BeaconShowSchema: FastifySchema = {
  description: "Beacon Latest By Id",
  tags: ["Beacon"],
  summary: "Beacon Latest By Id",
	params: {
    deviceId: { type: "number" },
  },
  querystring: {
    start: { type: "string" },
    end: { type: "string" },
  },
	headers: headerAuth,
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: beaconPropertiesSchema,
    },
  },
};

export const BeaconDownloadSchema: FastifySchema = {
  description: "Beacon Latest By Id",
  tags: ["Beacon"],
  summary: "Beacon Latest By Id",
  querystring: {
    start: { type: "string" },
    end: { type: "string" },
  },
  params: {
    deviceId: { type: "number" },
  },
  headers: {
    type: "object",
    properties: {
      Authorization: { type: "string" },
    },
    required: ["Authorization"],
  },
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: beaconPropertiesSchema,
    },
  },
};


export const BeaconDailySchema: FastifySchema = {
  description: "Beacon Latest daily By Id",
  tags: ["Beacon"],
  summary: "Beacon Latest daily By Id",
  querystring: {
    start: { type: "string" },
    end: { type: "string" },
  },
  params: {
    deviceId: { type: "number" },
  },
	headers: headerAuth,
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: beaconPropertiesSchema,
    },
  },
};

export const BeaconWeeklySchema: FastifySchema = {
  description: "Beacon Latest weekly By Id",
  tags: ["Beacon"],
  summary: "Beacon Latest weekly By Id",
  querystring: {
    start: { type: "string" },
    end: { type: "string" },
  },
  params: {
    deviceId: { type: "number" },
  },
	headers: headerAuth,
  response: {
    200: {
      description: "Success",
      type: "array",
      properties: beaconPropertiesSchema,
    },
  },
};