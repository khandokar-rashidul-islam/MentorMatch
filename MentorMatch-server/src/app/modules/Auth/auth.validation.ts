import { z } from "zod";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }),
  }),
});
