import { FastifyRequest } from "fastify";

declare module "jsonwebtoken" {
    export interface JwtPayload {
        payload: {
            id: string,
            email: string,
            nik: string,
            nama: string,
        }
    }
}
export interface DecodeToken {
    payload: {
        id: string,
        email: string,
        nik: string,
        nama: string,
    },
    iat: string,
    exp: string
}

export interface CustomFastifyRequest extends FastifyRequest {

    jwt_token: DecodeToken;
}