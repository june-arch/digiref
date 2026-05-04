import { object, string, InferType } from "yup";

export const authLoginSchema = object({
  username: string().required(),
  password: string().required()
});

export type AuthLoginType = InferType<typeof authLoginSchema>;