import { TUserRole } from "../modules/user/user.constant";
import { Server as SocketIOServer } from "socket.io";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // user or admin ID from JWT
        activeRole?: string; // current active role
        role?: TUserRole[]; // roles array
      };
      io: SocketIOServer; // socket.io server instance
    }
  }
}
