import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {} from "yup";
import { DistrictShowSchema } from "../documentation/monitoring/disctricApi";
import { findByRegencyId, findById } from "../repositories/districRepository";

const regency = async (_request: FastifyRequest<{
  Params: {
    regencyId: number;
  };
}>, _reply: FastifyReply) => {
  const { regencyId } = _request.params;
  const districts = await findByRegencyId(regencyId);

  _reply.send(districts);
};

const show = async (
  _request: FastifyRequest<{
    Params: {
      districId: number;
    };
  }>,
  _reply: FastifyReply
) => {
  const { districId } = _request.params;
  const district = await findById(districId);
  _reply.send(district);
};

export default async function districtController(fastify: FastifyInstance) {
  fastify.get("/regency/:regencyId", {
    handler: regency,
  });
  fastify.get("/:districId", {
    handler: show,
    schema: DistrictShowSchema
  });
}
