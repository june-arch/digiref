import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {} from "yup";
import { findByDistrictId } from "../repositories/villageRepository";

const district = async (_request: FastifyRequest<{
  Params: {
    districtId: number;
  };
}>, _reply: FastifyReply) => {
  const { districtId } = _request.params;
  const villages = await findByDistrictId(districtId);

  _reply.send(villages);
};

export default async function villageController(fastify: FastifyInstance) {
  fastify.get("/district/:districtId", {
    handler: district,
  });
}
