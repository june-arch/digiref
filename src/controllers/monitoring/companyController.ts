import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { object, string } from "yup";
import { ComapnyCreateSchema, ComapnyIndexSchema, ComapnyShowSchema } from "../../documentation/monitoring/companyApi";
import authMiddleware from "../../middlewares/authMiddleware";
import { findAll, findById, insert } from "../../repositories/companyRepository";

let createCompanySchema = object({
  name: string().required(),
});

const create = async (_request: FastifyRequest, _reply: FastifyReply) => {

  const params = await createCompanySchema.validate(_request.body);
  const [ { id } ] = await insert(params);

  _reply.statusCode = 201;
  _reply.send({
    id,
    name: params.name,
  });
};

const index = async (_request: FastifyRequest, _reply: FastifyReply) => {

  const companies = await findAll();

  _reply.send(companies);
};

const show = async (
  _request: FastifyRequest<{
    Params: {
      companyId: number;
    };
  }>,
  _reply: FastifyReply
) => {
  const { companyId } = _request.params;
  const company = await findById(companyId);

  _reply.send(company);
};

export default async function companyController(fastify: FastifyInstance) {
  fastify.post("/", {
    handler: create,
    preHandler: [authMiddleware],
    schema: ComapnyCreateSchema
  });
  fastify.get("/",  {
    handler: index,
    preHandler: [authMiddleware],
    schema: ComapnyIndexSchema
  });
  fastify.get("/:companyId",  {
    handler: show,
    preHandler: [authMiddleware],
    schema: ComapnyShowSchema
  });
}
