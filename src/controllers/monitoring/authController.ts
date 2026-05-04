import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { addDays, getUnixTime } from "date-fns";
import { authLoginSchema } from "../../dto/authDto";
import { findByUsername } from "../../repositories/adminRepository";
import { validPassword } from "../../services/authService";
import jwt from "jsonwebtoken";
import { AuthLoginSchema } from "../../documentation/monitoring/authApi";

const login = async (_request: FastifyRequest, reply: FastifyReply) => {
  const params = await authLoginSchema.validate(_request.body);

  const admin = await findByUsername(params.username);

  if (!admin) {
    return reply.status(400).send({ message: "User or password doen't macth" });
  }

  if (!await validPassword(params.password, admin.password)) {
    return reply.status(400).send({ message: "Invalid password" });
  }
  const tokenSecret = process.env.TOKEN_SECRET!;

  const expiryDate = addDays(Date.now(), 365);
  const expiresIn = getUnixTime(expiryDate);
  const token = jwt.sign({ adminId: admin.id, roleId: admin.role_id }, tokenSecret, {
    expiresIn,
  });

  return reply.send({
    data: {
      name: admin.name || "",
      username: admin.username,
      role: admin.role_id,
      logo: admin.logo ? admin.logo : '',
      token,
      expiresIn,
    },
    message: "Login Success!",
  });
};

export default async function authController(fastify: FastifyInstance) {
  fastify.post("/", {
    handler: login,
    schema: AuthLoginSchema,
  });
}
