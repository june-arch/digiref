import { SwaggerOptions as Swagger } from '@fastify/swagger';

const PUBLIC_HOST = process.env.PUBLIC_HOST || 'localhost:4001';

export const SwaggerOptions: Swagger = {
  // swagger 2.0 options
  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: PUBLIC_HOST,
    schemes: ["https", "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "user", description: "User related end-points" },
      { name: "code", description: "Code related end-points" },
    ],
    definitions: {
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: {type: 'string', format: 'email' }
        }
      }
    },
    securityDefinitions: {},
  },
};

export const SwaggerUiOptions =  {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'none',
    deepLinking: false
  },
  uiHooks: {
    //@ts-ignore
    onRequest: function (request, reply, next) { next() },
    //@ts-ignore
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  //@ts-ignore
  transformStaticCSP: (header) => header,
  //@ts-ignore
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
};