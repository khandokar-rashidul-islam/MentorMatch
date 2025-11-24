import { TUserRole } from "../modules/user/user.constant";

declare module "socket.io" {
  interface Socket {
    user?: {
      userId: string; // same as req.user.id
      activeRole?: TUserRole;
      role?: TUserRole[];
      [key: string]: unknown;
    };
  }
}
