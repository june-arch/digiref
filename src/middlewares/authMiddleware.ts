import { FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export default async function authMiddleware(_request: any, reply: FastifyReply) {
    let authorization = ''
    if (!authorization && 'authorization' in _request?.raw?.headers) {
      authorization = _request.raw.headers['authorization']!
    }
    if (!authorization && 'Authorization' in _request?.raw?.headers) {
      authorization = _request.raw.headers['Authorization']! as string
    }

    //@ts-ignore
    if (!authorization && 'token' in _request?.query) {
       //@ts-ignore
      authorization = _request.query['token']! as string
    }
    

    const token = authorization?.replace('Bearer', '').trim()
    if (token) {
      try {
        const tokenSecret = process.env.TOKEN_SECRET!;
        jwt.verify(token, tokenSecret);
        let decodedAdmin = jwt.verify(token, tokenSecret);

        _request['user'] = decodedAdmin;
        return
      } catch(err) {
        // err
      }
    }
    
    reply.code(401).send({
      errror: 'Unauthorized'
    });
} 