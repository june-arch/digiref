import { number, object, string, InferType } from "yup";

export const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/JPEG', 'image/PNG', 'image/JPG'];

// FormData kirim semua field sebagai string — coerce ke number
const coerceNumber = () => number().transform((_value, original) => {
  const n = Number(original);
  return isNaN(n) ? undefined : n;
});

export const createTenantSchema = object({
  username: string().required(),
  password: string().required(),
  name: string().required(),
  email: string().required(),
  no_hp: string().required(),
  alamat: string().required(),
  contact_person: string().required(),
  village_id: coerceNumber().required(),
  postcode_id: coerceNumber().required(),
  role_id: coerceNumber().required(),
});

export type CreateTenant = InferType<typeof createTenantSchema>;

export const updateTenantSchema = object({
  id: coerceNumber().optional(),
  username: string().optional(),
  password: string().optional(),
  name: string().optional(),
  email: string().optional(),
  no_hp: string().optional(),
  alamat: string().optional(),
  contact_person: string().optional(),
  village_id: coerceNumber().optional(),
  postcode_id: coerceNumber().optional(),
  role_id: coerceNumber().optional(),
});

export type UpdateTenant = InferType<typeof updateTenantSchema>;

export const changePasswordTenantSchema = object({
  id: number().required(),
  old_password: string().required(),
  new_password: string().required()
});

export type ChangePasswordTenant = InferType<typeof changePasswordTenantSchema>;
