import { number, object, InferType } from "yup";

export const assignProjectDeviceTenantSchema = object({
  id_admin: number().required(),
  id_project_device: number().required(),
});

export type assignProjectDeviceTenant = InferType<typeof assignProjectDeviceTenantSchema>;