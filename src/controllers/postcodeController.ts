import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {} from "yup";
import { findByDistrictId } from "../repositories/postcodeRepository";

const district = async (_request: FastifyRequest<{
  Params: {
    districtId: number;
  };
}>, _reply: FastifyReply) => {
  const { districtId } = _request.params;
  const districts = await findByDistrictId(districtId);

  _reply.send(districts);
};

export default async function postcodeController(fastify: FastifyInstance) {
  fastify.get("/district/:districtId", {
    handler: district,
  });
}
