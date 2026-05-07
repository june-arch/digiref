import { number, object, string, InferType, array } from "yup";
// import { ALLOWED_MIMETYPES } from "./tenantDto";

export const createUpdateProjectSchema = object({
  id: number().optional(),
  name: string().required(),
  pic: string().required(),
  phone: string().required(),
  address: string().required(),
  device_id: number().required(),
  tenant_id: number().required(),
  chiller_type_id: number().required(),
  village_id: number().required(),
  postcode_id: number().required(),
  project_id: number().optional(),
});

export type CreateProjectType = InferType<typeof createUpdateProjectSchema>;

export const createUpdateGambarProjectSchema = object({
  id: number().required(),
  position_site: array().of(
    object({
      id: number().optional(),
      name: string().required(),
      xPos: string().required(),
      yPos: string().required(),
    }).required()
  ).required()
});

export type CreateGambarProjectType = InferType<typeof createUpdateGambarProjectSchema>;

export const deleteGambarProjectSchema = object({
  id: number().required(),
  position_site: array().of(
    object({
      id: number().required(),
    }).required()
  ).required()
});

export type DeleteGambarProjectType = InferType<typeof deleteGambarProjectSchema>;

export const createUpdateGambarUploadProjectSchema = object({
  id: number().required(),
  // gambar_site: array().of(
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
  gambar_site: array()
});

export type CreateGambarUploadProjectType = InferType<typeof createUpdateGambarUploadProjectSchema>;