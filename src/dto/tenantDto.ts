import { number, object, string, InferType, array } from "yup";

export const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/JPEG', 'image/PNG', 'image/JPG'];

export const createTenantSchema = object({
  username: string().required(),
  password: string().required(),
  name: string().required(),
  email: string().required(),
  no_hp: string().required(),
  alamat: string().required(),
  contact_person: string().required(),
  village_id: number().required(),
  postcode_id: number().required(),
  role_id: number().required(),
  // logo: array().of(
  //   object().shape({
  //     data: mixed().required().test('is-Uint8Array', 'Data harus berupa Uint8Array', (value) =>
  //         value instanceof Uint8Array
  //       ),
  //     filename: string().required(),
  //     encoding: string().required(),
  //     mimetype: string().oneOf(ALLOWED_MIMETYPES, `Hanya jenis file berikut yang diizinkan: ${ALLOWED_MIMETYPES.join(', ')}`).required(),
  //     limit: boolean().required(),
  //   })
  // ),
  logo: array()
});

export type CreateTenant = InferType<typeof createTenantSchema>;

export const updateTenantSchema = object({
  id: number().optional(),
  username: string().optional(),
  password: string().optional(),
  name: string().optional(),
  email: string().optional(),
  no_hp: string().optional(),
  alamat: string().optional(),
  contact_person: string().optional(),
  village_id: number().optional(),
  postcode_id: number().optional(),
  role_id: number().optional(),
  // logo: array().of(
  //   object().shape({
  //     data: mixed().required().test('is-Uint8Array', 'Data harus berupa Uint8Array', (value) =>
  //         value instanceof Uint8Array
  //       ),
  //     filename: string().required(),
  //     encoding: string().required(),
  //     mimetype: string().oneOf(ALLOWED_MIMETYPES, `Hanya jenis file berikut yang diizinkan: ${ALLOWED_MIMETYPES.join(', ')}`).required(),
  //     limit: boolean().required(),
  //   })
  // ),
  logo: array()
});

export type UpdateTenant = InferType<typeof updateTenantSchema>;

export const changePasswordTenantSchema = object({
  id: number().required(),
  old_password: string().required(),
  new_password: string().required()
});

export type ChangePasswordTenant = InferType<typeof changePasswordTenantSchema>;