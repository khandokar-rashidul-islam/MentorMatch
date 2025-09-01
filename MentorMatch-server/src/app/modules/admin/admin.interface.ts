import { Document } from "mongoose";
import { TAdminRole } from "./admin.constant";

export interface IAdmin extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TAdminRole;
  isLocked: boolean;
}
