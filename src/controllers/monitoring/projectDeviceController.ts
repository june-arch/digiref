import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import {
  insert,
  findById,
  findAll,
  findProvince,
  update as projectDeviceUpdate,
  insertGambar,
  insertGambarUpload,
  findByIdRaw,
  updateGambar,
  deleteGambar,
  findPositionSiteByProjectDeviceId
} from "../../repositories/projectDeviceRepository";

import { extname } from "path";
import { randomBytes } from "crypto";
import fs from "fs";

import { createUpdateGambarProjectSchema, createUpdateGambarUploadProjectSchema, createUpdateProjectSchema, deleteGambarProjectSchema } from "../../dto/projectDeviceDto";
import authMiddleware from "../../middlewares/authMiddleware";
import { ProjectDeviceCreateSchema, ProjectDeviceIndexSchema, ProjectDeviceProvinceSchema, ProjectDeviceShowSchema, ProjectDeviceUpdateSchema, ProjectDeviceUploadGambarSchema } from "../../documentation/monitoring/projectDeviceApi";

const create = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await createUpdateProjectSchema.validate(_request.body);
  const [{ id }] = await insert(params);

  _reply.statusCode = 201;
  _reply.send({
    ...params,
    id,
  });
};

const update = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await createUpdateProjectSchema.validate(_request.body);
  const { id } = params
  if (!id || id < 0) {
    _reply.statusCode = 400;
    return _reply.send({...params, id})
  }

  await projectDeviceUpdate(id, params);
  _reply.statusCode = 201;
  return _reply.send({...params, id})
};

const index = async (_request: any, _reply: FastifyReply) => {
  let role;
  let admin;
  if(_request.user) {
    role = _request.user.roleId == 1 ? null : _request.user.roleId;
    admin = _request.user.adminId == 1 ? null : _request.user.adminId;
  }
  const projectDevices = await findAll(role, admin);

  _reply.send(projectDevices?.map((value:any) => {
    value.gambar_site = value.gambar_site? value.gambar_site : '';
    value.longitude = value?.longitude ? value.longitude : '0';
    value.latitude = value?.latitude ? value.latitude : '0';
    value.longitude = value?.longitude ? value.longitude : '0';
    value.chiller.latitude = value?.chiller?.latitude ? value?.chiller?.latitude : '0';
    return value;
  }));
};

const show = async (
  _request: any,
  _reply: FastifyReply
) => {
  let role;
  let admin;
  if(_request.user) {
    role = _request.user.roleId == 1 ? null : _request.user.roleId;
    admin = _request.user.adminId == 1 ? null : _request.user.adminId;
  }
  const { pdId } = _request.params;
  const projectDevice = await findById(pdId, admin, role);
  _reply.send(projectDevice?.map((value:any) => {
    value.gambar_site = value.gambar_site? value.gambar_site : '';
    return value;
  }));
};

const province = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const projectDevice = await findProvince();
  _reply.send(projectDevice);
};

const uploadGambarSite = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await createUpdateGambarUploadProjectSchema.validate(_request.body);

  const projectDevice = await findByIdRaw(params.id);

  if(!projectDevice){
    return _reply.code(404).send('data tidak ditemukan');
  }

  if(!(params.gambar_site && params.gambar_site.length > 0)) {
    return _reply.code(400).send('gambar site tidak boleh kosong');
  }

  let file = params.gambar_site[0];

  const fileName = `gambar-site-${Date.now()}-${randomBytes(4).toString("hex")}${extname(file.filename)}`;

  file.filename = fileName;

  await new Promise<void>((resolve, reject) => {
    fs.writeFile(`${process.env.MONITORING_UPLOAD}gambar-site/${file.filename}`, file.data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  fs.unlink(`${process.env.MONITORING_UPLOAD}gambar-site/${projectDevice.gambar_site}`, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('gambar-site deleted');
  });

  const [{ id }] = await insertGambarUpload(params, file.filename);

  _reply.statusCode = 201;
  return _reply.send({
    id,
  });
};

const gambarSite = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await createUpdateGambarProjectSchema.validate(_request.body);

  const projectDevice = await findByIdRaw(params.id);

  if(!projectDevice){
    return _reply.code(404).send('data tidak ditemukan');
  }

  const [{ id }] = await insertGambar(params);

  _reply.statusCode = 201;
  return _reply.send({
    ...params,
    id,
  });
};

const gambarSiteUpdate = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await createUpdateGambarProjectSchema.validate(_request.body);

  const projectDevice = await findByIdRaw(params.id);

  if(!projectDevice){
    return _reply.code(404).send('data tidak ditemukan');
  }

  for(let val of params.position_site){
    if(!val.id){
      return _reply.code(400).send('id position site tidak boleh kosong');
    }
  }

  const result = await updateGambar(params);

  if(!result){
    return _reply.code(500).send('Gagal update data')
  }

  _reply.statusCode = 201;
  return _reply.send({
    ...params,
  });
};

const gambarSiteDelete = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await deleteGambarProjectSchema.validate(_request.body);

  const projectDevice = await findByIdRaw(params.id);

  if(!projectDevice){
    return _reply.code(404).send('data tidak ditemukan');
  }

  for(let val of params.position_site){
    if(!val.id){
      return _reply.code(400).send('id position site tidak boleh kosong');
    }
  }

  const result = await deleteGambar(params);

  if(!result){
    return _reply.code(500).send('Gagal delete data')
  }

  _reply.statusCode = 201;
  return _reply.send({
    ...params,
  });
};

const listPositionsSite = async (_request: any, _reply: FastifyReply) => {
  let role;
  let admin;
  if(_request.user) {
    role = _request.user.roleId == 1 ? null : _request.user.roleId;
    admin = _request.user.adminId == 1 ? null : _request.user.adminId;
  }
  const { project_device_id } = _request.params;
  if(!project_device_id){
    return _reply.code(400).send('id tidak boleh kosong');
  }
  const projectDevices = await findById(project_device_id, role, admin);

  if(!(projectDevices && projectDevices.length > 0)){
    return _reply.code(404).send('data tidak ditemukan');
  }

  const positionSites = await findPositionSiteByProjectDeviceId(project_device_id);

  const result = projectDevices.shift();
  result.position_site = positionSites && positionSites.length > 0? positionSites : [];
  result.gambar_site = result.gambar_site? result.gambar_site : '';

  return _reply.send(result);
};

export default async function projectDeviceController(
  fastify: FastifyInstance
) {
  fastify.post("/", {
    preHandler: [authMiddleware],
    handler: create,
    schema: ProjectDeviceCreateSchema
  });
  fastify.put("/", {
    preHandler: [authMiddleware],
    handler: update,
    schema: ProjectDeviceUpdateSchema
  });
  fastify.get("/", {
    preHandler: [authMiddleware],
    handler: index,
    schema: ProjectDeviceIndexSchema,
  });
  fastify.get("/:pdId", {
    preHandler: [authMiddleware],
    handler: show,
    schema: ProjectDeviceShowSchema
  });
  fastify.get("/province", {
    preHandler: [authMiddleware],
    handler: province,
    schema: ProjectDeviceProvinceSchema
  });
  fastify.post("/gambar-site", {
    preHandler: [authMiddleware],
    handler: gambarSite,
    schema: ProjectDeviceUploadGambarSchema
  });
  fastify.put("/gambar-site", {
    preHandler: [authMiddleware],
    handler: gambarSiteUpdate,
    schema: ProjectDeviceUploadGambarSchema
  });
  fastify.get("/:project_device_id/gambar-site", {
    preHandler: [authMiddleware],
    handler: listPositionsSite,
    schema: ProjectDeviceIndexSchema,
  });
  fastify.delete("/gambar-site", {
    preHandler: [authMiddleware],
    handler: gambarSiteDelete,
    schema: ProjectDeviceUploadGambarSchema
  });
  fastify.register(require('@fastify/multipart'), {
    addToBody: true
  });
  fastify.post("/gambar-site/upload", {
    preHandler: [authMiddleware],
    handler: uploadGambarSite,
    schema: ProjectDeviceUploadGambarSchema
  });
}
