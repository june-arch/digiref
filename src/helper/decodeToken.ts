// import { FastifyRequest } from "fastify";
import * as jwt from "jsonwebtoken";

export async function decodeToken(token: string) {
    // const token = _request?.raw?.headers?.authorization || '';
    try {
        const tokenSecret = process.env.TOKEN_SECRET!;
        const decode = jwt.verify(token.split(' ')[1], tokenSecret) as jwt.JwtPayload;
        console.log(decode);
        return decode;
    } catch (err) {
        console.log('false');
        return false;
    }

} 