import jwt, { JwtPayload as DefaultJwtPayload, SignOptions } from "jsonwebtoken";
import { JwtPayload } from "./auth.interface";

export const createToken = (
  payload: JwtPayload,
  secret: jwt.Secret,
  expiresIn: string | number
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions );
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as DefaultJwtPayload & JwtPayload;
};
