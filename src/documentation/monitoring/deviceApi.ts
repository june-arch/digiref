import { FastifySchema } from "fastify";
import { headerAuth } from "./commonSchema";

export const DeviceIndexSchema: FastifySchema = {
  description: "Device",
  tags: ["Device"],
  summary: "Device",
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "array",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        imei: { type: "string" },
        sim_id: { type: "string" },
        analog_1: { type: "string" },
        analog_2: { type: "string" },
        kalibrasi_1: { type: "number" },
        kalibrasi_2: { type: "number" },
        temperatur_1: { type: "number" },
        temperatur_2: { type: "number" },
        temperatur_3: { type: "number" },
        temperatur_4: { type: "number" },
      },
    },
  },
};

export const DeviceCreateSchema: FastifySchema = {
  description: "Create Device",
  tags: ["Device"],
  summary: "Create Device",
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        imei: { type: "string" },
        sim_id: { type: "string" },
        analog_1: { type: "string" },
        analog_2: { type: "string" },
        kalibrasi_1: { type: "number" },
        kalibrasi_2: { type: "number" },
        kalibrasi_temperatur_1: { type: "number" },
        kalibrasi_temperatur_2: { type: "number" },
        kalibrasi_temperatur_3: { type: "number" },
        kalibrasi_temperatur_4: { type: "number" },
      },
    },
  },
};

export const DeviceUpdateSchema: FastifySchema = {
  description: "Update Device",
  tags: ["Device"],
  summary: "Update Device",
  body: {
    id: { type: "number" },
    name: { type: "string" },
    imei: { type: "string" },
    sim_id: { type: "string" },
    analog_1: { type: "string" },
    analog_2: { type: "string" },
    kalibrasi_1: { type: "number" },
    kalibrasi_2: { type: "number" },
    kalibrasi_temperatur_1: { type: "number" },
    kalibrasi_temperatur_2: { type: "number" },
    kalibrasi_temperatur_3: { type: "number" },
    kalibrasi_temperatur_4: { type: "number" },
  },
  headers: headerAuth,
  response: {
    204: {
      description: "Success",
      type: "null",
    },
  },
};

export const DeviceControlSchema: FastifySchema = {
  description: "Control Device",
  tags: ["Device"],
  summary: "Control Device",
  body: {
    id: { type: "number" },
    command: { type: "string" },
  },
  headers: headerAuth,
  response: {
    201: {
      description: "Success",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};