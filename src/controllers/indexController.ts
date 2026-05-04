import { FastifyInstance, FastifyRequest } from "fastify";

export default async function indexController(fastify: FastifyInstance) {

  fastify.get("/", async function (
    _request: FastifyRequest
  ) {
    return { version: 1.1 }
  });
  fastify.get("ok", async function (
    _request: FastifyRequest
  ) {
    return { version: "HELLO WORLD" }
  });
}
