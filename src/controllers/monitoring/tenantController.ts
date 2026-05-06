import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { TenantAssignProjectDeviceSchema, TenantDeleteSchema, TenantIndexSchema, TenantShowSchema, TenantUpdateSchema } from "../../documentation/monitoring/tenantApi";
import { assignProjectDeviceTenantSchema } from "../../dto/tenantAssignProjectDeviceDto";
import { changePasswordTenantSchema, CreateTenant, createTenantSchema, updateTenantSchema } from "../../dto/tenantDto";

import authMiddleware from "../../middlewares/authMiddleware";
import { deleteAdmin, findAll, findById, insert, update as updateTenat, updatePassword } from "../../repositories/tenantRepository";
import { updateAssignAdmin } from "../../repositories/projectDeviceRepository";

import { extname } from "path";
import { randomBytes } from "crypto";
import fs from "fs";
import { validPassword } from "../../services/authService";
import { ALLOWED_MIMETYPES } from "../../dto/tenantDto";

const create = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const req = _request as any;

  // Baca semua parts dari multipart
  const fields: Record<string, any> = {};
  const fileParts: any[] = [];

  for await (const part of req.parts()) {
    if (part.type === 'file') {
      const buffer = await part.toBuffer();
      fileParts.push({ fieldname: part.fieldname, filename: part.filename, mimetype: part.mimetype, data: buffer });
    } else {
      fields[part.fieldname] = part.value;
    }
  }

  // Logo harus ada
  const logoFile = fileParts.find(f => f.fieldname === 'logo');
  if (!logoFile) {
    return _reply.code(400).send({ message: 'logo tidak boleh kosong' });
  }

  if (!ALLOWED_MIMETYPES.includes(logoFile.mimetype)) {
    return _reply.code(400).send({ message: `Hanya jenis file berikut yang diizinkan: ${ALLOWED_MIMETYPES.join(', ')}` });
  }

  // Validasi dengan Yup
  const params: CreateTenant = await createTenantSchema.validate(fields);

  // Buat nama file baru
  const fileName = `logo-perusahaan-${Date.now()}-${randomBytes(4).toString("hex")}${extname(logoFile.filename)}`;

  // Tulis file
  await new Promise<void>((resolve, reject) => {
    fs.writeFile(`${process.env.MONITORING_UPLOAD}logo/${fileName}`, logoFile.data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  const {success, data, code, message} = await insert(params, fileName);

  if(!success){
    return _reply.code(code).send(message);
  }

  const [{ id }] = data ?? [{id: 0}];
  _reply.statusCode = code;
  return _reply.send({
    ...params,
    id,
  });
};

const update = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const req = _request as any;

  const fields: Record<string, any> = {};
  const fileParts: any[] = [];

  for await (const part of req.parts()) {
    if (part.type === 'file') {
      const buffer = await part.toBuffer();
      fileParts.push({ fieldname: part.fieldname, filename: part.filename, mimetype: part.mimetype, data: buffer });
    } else {
      fields[part.fieldname] = part.value;
    }
  }

  const params = await updateTenantSchema.validate(fields);
  const { id } = params
  if (!id || id < 0) {
    return
  }

  const tenant = await findById(id);

  if(!tenant){
    return _reply.code(404).send('data tidak ditemukan');
  }

  let filename = '';
  const logoFile = fileParts.find(f => f.fieldname === 'logo');

  if (logoFile) {
    if (!ALLOWED_MIMETYPES.includes(logoFile.mimetype)) {
      return _reply.code(400).send({ message: `Hanya jenis file berikut yang diizinkan: ${ALLOWED_MIMETYPES.join(', ')}` });
    }
    filename = `logo-perusahaan-${Date.now()}-${randomBytes(4).toString("hex")}${extname(logoFile.filename)}`;

    await new Promise<void>((resolve, reject) => {
      fs.writeFile(`${process.env.MONITORING_UPLOAD}logo/${filename}`, logoFile.data, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    fs.unlink(`${process.env.MONITORING_UPLOAD}logo/${tenant.logo}`, (err) => {
      if (err) console.log('gagal hapus logo lama:', err.message);
      else console.log('logo lama dihapus');
    });
  }

  const {success, code, message} = await updateTenat(id, tenant.company_id, params, filename);
  if(!success){
    return _reply.code(code).send(message);
  }
  _reply.statusCode = code;
  return _reply.send({
    ...params,
    id,
  });
};

const index = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const Tenants = await findAll();
  _reply.send(Tenants);
};

const show = async (
  _request: FastifyRequest<{
    Params: {
      tenantId: number;
    };
  }>,
  _reply: FastifyReply
) => {
  const { tenantId } = _request.params;
  const Tenant = await findById(tenantId);
  if(!Tenant){
    _reply.statusCode = 400;
    return _reply.send('data tidak ditemukan');
  }
  _reply.statusCode =200;
  return _reply.send(Tenant);
};

const assignProjectDevice = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await assignProjectDeviceTenantSchema.validate(_request.body);
  const { id_admin, id_project_device } = params
  if ((!id_admin || id_admin < 0) || (!id_project_device || id_project_device < 0)) {
    return
  }

  await updateAssignAdmin(id_project_device, id_admin);
  _reply.statusCode = 204;
}

const changePassword = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await changePasswordTenantSchema.validate(_request.body);
  const { id } = params
  if (!id || id < 0) {
    return
  }

  const tenant = await findById(id);

  if(!tenant){
    return _reply.code(404).send('data tidak ditemukan');
  }

  if (!validPassword(params.old_password, tenant.password)) {
    return _reply.status(400).send({ message: "Invalid old password" });
  }

  const {success, code, message} = await updatePassword(id, params.new_password);
  if(!success){
    return _reply.code(code).send(message);
  }
  _reply.statusCode = code;
  return _reply.send({
    ...params,
    id,
  });
};

const deleteTenant = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const { tenantId }: any = _request.params;
  if ((tenantId < 0) || !tenantId) {
    _reply.statusCode = 400;
    return _reply.send('id tidak boleh kosong atau invalid')
  }

  const tenant = await findById(tenantId);
  if(!tenant){
    _reply.statusCode = 404;
    return _reply.send('data tidak ditemukan');
  }

  await deleteAdmin(tenantId, tenant.company_id);
  _reply.statusCode = 200;
  return _reply.send({id: tenant.id});
}

export default async function authController(fastify: FastifyInstance) {
  fastify.post("/change-password", {
    preHandler: [authMiddleware],
    handler: changePassword,
    schema: TenantUpdateSchema
  });
  fastify.delete("/:tenantId", {
    preHandler: [authMiddleware],
    handler: deleteTenant,
    schema: TenantDeleteSchema
  });
  fastify.register(require('@fastify/multipart'), {
    limits: { fileSize: 5 * 1024 * 1024 }
  });
  fastify.post("/", {
    preHandler: [authMiddleware],
    handler: create,
  });
  fastify.put("/", {
    preHandler: [authMiddleware],
    handler: update,
  });
  fastify.get("/", {
    preHandler: [authMiddleware],
    handler: index,
    schema: TenantIndexSchema
  });
  fastify.get("/:tenantId", {
    preHandler: [authMiddleware],
    handler: show,
    schema: TenantShowSchema
  });
  fastify.post("/assign-project-device", {
    preHandler: [authMiddleware],
    handler: assignProjectDevice,
    schema: TenantAssignProjectDeviceSchema
  });
}
