import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {} from "yup";
import { RegencyShowSchema } from "../documentation/monitoring/regencyApi";
import { findByProvinceId, findById } from "../repositories/regencyRepository";

const province = async (_request: FastifyRequest<{
  Params: {
    provinceId: number;
  };
}>, _reply: FastifyReply) => {
  const { provinceId } = _request.params;
  const regencies = await findByProvinceId(provinceId);

  _reply.send(regencies);
};

const show = async (
  _request: FastifyRequest<{
    Params: {
      regencyId: number;
    };
  }>,
  _reply: FastifyReply
) => {
  const { regencyId } = _request.params;
  const regency = await findById(regencyId);
  _reply.send(regency);
};

export default async function regencyController(fastify: FastifyInstance) {
  fastify.get("/province/:provinceId", {
    handler: province,
  });
  fastify.get("/:regencyId", {
    handler: show,
    schema: RegencyShowSchema
  });
}
