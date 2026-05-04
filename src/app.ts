import fastify from "fastify";
import cors from '@fastify/cors'
import router from "./router";
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { SwaggerOptions, SwaggerUiOptions } from './config/swagger';


require('dotenv').config();

const server = fastify({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
});

server.register(swagger, SwaggerOptions);
//@ts-ignore
server.register(swaggerUi, SwaggerUiOptions);
// Middleware: Router
server.register(router);


const corsOptions = {
  origin: "*",
  methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
}
server.register(cors, corsOptions)

export default server;
