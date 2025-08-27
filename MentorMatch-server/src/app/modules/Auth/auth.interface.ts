// src/app/modules/auth/auth.interface.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  role: string;
  activeRole: string;
}
