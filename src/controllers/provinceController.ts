import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {} from "yup";
import { ProvinceIndexSchema, ProvinceShowSchema } from "../documentation/monitoring/provinceApi";
import { findAll, findById } from "../repositories/provinceRepository";

const index = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const provinces = await findAll();

  _reply.send(provinces);
};

const show = async (
  _request: FastifyRequest<{
    Params: {
      provinceId: number;
    };
  }>,
  _reply: FastifyReply
) => {
  const { provinceId } = _request.params;
  const province = await findById(provinceId);
  _reply.send(province);
};

export default async function provinceController(fastify: FastifyInstance) {
  fastify.get("/", {
    handler: index,
    schema: ProvinceIndexSchema
    
  });
  fastify.get("/:provinceId", {
    handler: show,
    schema: ProvinceShowSchema
  });
}
