import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { object, string } from "yup";
import { ChillerTypeCreateSchema, ChillerTypeIndexSchema, ChillerTypeSchema } from "../../documentation/monitoring/chillerTypeApi";
import authMiddleware from "../../middlewares/authMiddleware";
import { findAll, findById, insert } from "../../repositories/chillerTypeRepository";

let createChillerTypeSchema = object({
  name: string().required(),
});

const create = async (_request: FastifyRequest, _reply: FastifyReply) => {

  const params = await createChillerTypeSchema.validate(_request.body);
  const [ { id } ] = await insert(params);

  _reply.statusCode = 201;
  _reply.send({
    id,
    name: params.name,
  });
};

const index = async (_request: FastifyRequest, _reply: FastifyReply) => {

  const chillers = await findAll();

  _reply.send(chillers);
};

const show = async (
  _request: FastifyRequest<{
    Params: {
      chillerTypeId: number;
    };
  }>,
  _reply: FastifyReply
) => {
  const { chillerTypeId } = _request.params;
  const chiller = await findById(chillerTypeId);

  _reply.send(chiller);
};

export default async function chillerTypeController(fastify: FastifyInstance) {
  fastify.post("/", {
    handler: create,
    preHandler: [authMiddleware],
    schema: ChillerTypeCreateSchema
  });
  fastify.get("/", {
    handler: index,
    preHandler: [authMiddleware],
    schema: ChillerTypeIndexSchema
  });
  fastify.get("/:chillerTypeId", {
    handler: show,
    preHandler: [authMiddleware],
    schema: ChillerTypeSchema
  });
}
