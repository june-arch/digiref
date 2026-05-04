import app from "./app";
import job from "./cronjob";

const FASTIFY_PORT = Number(process.env.PORT) || 4001;
const HOST = process.env.HOST || '0.0.0.0';


app.listen({ port: FASTIFY_PORT, host: HOST }, (err, address) => {
  if (err) throw err
  app.swagger();
  console.log(`🚀  Fastify server running on ${address}`);
  job.start();
})