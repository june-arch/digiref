import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { object, string } from "yup";
import { ProjectCreateSchema, ProjectIndexSchema, ProjectShowSchema } from "../../documentation/monitoring/projectApi";
import authMiddleware from "../../middlewares/authMiddleware";
import { findAll, findById, insert } from "../../repositories/projectRepository";

let createProjectSchema = object({
  name: string().required(),
});

const create = async (_request: FastifyRequest, _reply: FastifyReply) => {

  const params = await createProjectSchema.validate(_request.body);
  const [ { id } ] = await insert(params);

  _reply.statusCode = 201;
  _reply.send({
    id,
    name: params.name,
  });
};

const index = async (_request: FastifyRequest, _reply: FastifyReply) => {

  const projects = await findAll();

  _reply.send(projects);
};

const show = async (
  _request: FastifyRequest<{
    Params: {
      projectId: number;
    };
  }>,
  _reply: FastifyReply
) => {
  const { projectId } = _request.params;
  const project = await findById(projectId);

  _reply.send(project);
};

export default async function projectController(fastify: FastifyInstance) {
  fastify.post("/", {
    handler: create,
    preHandler: [authMiddleware],
    schema: ProjectCreateSchema
  });
  fastify.get("/", {
    handler: index,
    preHandler: [authMiddleware],
    schema: ProjectIndexSchema
  });
  fastify.get("/:projectId", {
    handler: show,
    preHandler: [authMiddleware],
    schema: ProjectShowSchema
  });
}
