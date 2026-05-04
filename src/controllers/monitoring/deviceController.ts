import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DeviceControlSchema, DeviceCreateSchema, DeviceIndexSchema, DeviceUpdateSchema } from "../../documentation/monitoring/deviceApi";
import { createDeviceSchema, sendCommandDeviceSchema, updateDeviceSchema } from "../../dto/deviceDto";
import authMiddleware from "../../middlewares/authMiddleware";
import { deleteOneDevice, findAll, findById, insert, update as deviceUpdate } from "../../repositories/deviceRepository";
import { sendCommandTruephone } from "../../helper/truphone";


const index = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const devices = await findAll();
  _reply.send(devices.map(item => ({...item, kalibrasi_1: Number(item.kalibrasi_1) ?? 0, kalibrasi_2: Number(item.kalibrasi_2) ?? 0})));
};

const create = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await createDeviceSchema.validate(_request.body);
  const [{ id }] = await insert({...params, kalibrasi_1: params.kalibrasi_1.toString(), kalibrasi_2: params.kalibrasi_2.toString(), kalibrasi_temperatur_1: params.kalibrasi_temperatur_1.toString(), kalibrasi_temperatur_2: params.kalibrasi_temperatur_2.toString(), kalibrasi_temperatur_3: params.kalibrasi_temperatur_3.toString(), kalibrasi_temperatur_4: params.kalibrasi_temperatur_4.toString(),});

  _reply.statusCode = 201;
  _reply.send({
    id,
    name: params.name,
    imei: params.imei,
    sim_id: params.sim_id,
    analog_1: params.analog_1,
    analog_2: params.analog_2,
    kalibrasi_1: params.kalibrasi_1,
    kalibrasi_2: params.kalibrasi_2,
    kalibrasi_temperatur_1: params.kalibrasi_temperatur_1,
    kalibrasi_temperatur_2: params.kalibrasi_temperatur_2,
    kalibrasi_temperatur_3: params.kalibrasi_temperatur_3,
    kalibrasi_temperatur_4: params.kalibrasi_temperatur_4,
  });
};

const update = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const params = await updateDeviceSchema.validate(_request.body);
  const { id } = params;
  if (!id || id < 0) {
    return
  }

  const device = await findById(id);

  if (!device) {
    return _reply.code(404).send({ message: 'data tidak ditemukan' });
  }

  const result = await deviceUpdate(id, params);
  if (!result) {
    return _reply.code(500).send({ message: 'Gagal update data' });
  }

  _reply.statusCode = 204;
  return
};

const deleteDevice = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const { id } = _request.params as { id: number };
  if (!id || id < 0) {
    return _reply.code(400).send({ message: 'data tidak ditemukan' });
    return
  }

  const device = await findById(id);

  if (!device) {
    return _reply.code(404).send({ message: 'data tidak ditemukan' });
  }

  await deleteOneDevice(id);

  _reply.statusCode = 204;
  return
};


const sendCommand = async (request: FastifyRequest, _reply: FastifyReply) => {
  const body = await sendCommandDeviceSchema.validate(request.body);
  const { id, command } = body;

  try {
    if (!id || id < 0) {
      return _reply.code(400).send({ message: 'Data not found' });
    }

    const device = await findById(id);

    if (!device) {
      return _reply.code(404).send({ message: 'Data not found' });
    }

    const result = await sendCommandTruephone(command, device.sim_id);
    // console.error(result);

    if (result !== null) {
      return _reply.code(200).send({ message: `Device command '${command}' sent` });
    } else {
      _reply.code(500).send({ message: 'Device command failed' });
      return
    }
  } catch (error) {
    console.error('Error:', error);
    return _reply.code(500).send({ message: 'An error occurred' });
  }
};


export default async function deviceController(fastify: FastifyInstance) {
  fastify.get("/", {
    handler: index,
    preHandler: [authMiddleware],
    schema: DeviceIndexSchema
  });
  fastify.post("/", {
    handler: create,
    preHandler: [authMiddleware],
    schema: DeviceCreateSchema
  });
  fastify.post("/control", {
    handler: sendCommand,
    preHandler: [authMiddleware],
    schema: DeviceControlSchema
  });
  fastify.put("/", {
    preHandler: [authMiddleware],
    handler: update,
    schema: DeviceUpdateSchema
  });
  fastify.delete("/:id", {
    handler: deleteDevice,
    preHandler: [authMiddleware],
  });
}
