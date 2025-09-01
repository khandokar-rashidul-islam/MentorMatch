import { TUserRole } from "../user/user.constant";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  activeRole: string;
  role: TUserRole[];
}
