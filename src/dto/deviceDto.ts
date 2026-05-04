import { object, string, InferType, number } from "yup";

export const createDeviceSchema = object({
  name: string().max(50).required(),
  imei: string().max(50).required(),
  sim_id: string().max(50).required(),
  analog_1: string().max(50).required(),
  analog_2: string().max(50).required(),
  kalibrasi_1: number().required(),
  kalibrasi_2: number().required(),
  kalibrasi_temperatur_1: number().required(),
  kalibrasi_temperatur_2: number().required(),
  kalibrasi_temperatur_3: number().required(),
  kalibrasi_temperatur_4: number().required()
});

export type CreateDeviceType = InferType<typeof createDeviceSchema>;

export const updateDeviceSchema = object({
  id: number().required(),
  name: string().max(50).required(),
  imei: string().max(50).required(),
  sim_id: string().max(50).required(),
  analog_1: string().max(50).required(),
  analog_2: string().max(50).required(),
  kalibrasi_1: number().required(),
  kalibrasi_2: number().required(),
  kalibrasi_temperatur_1: number().required(),
  kalibrasi_temperatur_2: number().required(),
  kalibrasi_temperatur_3: number().required(),
  kalibrasi_temperatur_4: number().required()
});

export type UpdateDeviceType = InferType<typeof updateDeviceSchema>;

export const sendCommandDeviceSchema = object({
  id: number().required(),
  command: string().oneOf(['on', 'off']).required(),
});

export type SendCommandDeviceType = InferType<typeof sendCommandDeviceSchema>;