import { object, string, InferType, number } from "yup";

export const beaconSearchParams = object({
  start: string().nullable(),
  end: string().nullable(),
  limit: number().integer().default(30),
  page: number().integer().required()
});

export type BeaconSearchType = InferType<typeof beaconSearchParams>;