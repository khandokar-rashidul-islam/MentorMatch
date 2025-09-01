import mongoose, { Schema } from "mongoose";
import { IAdmin} from "../admin/admin.interface";

const adminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["super-admin", "admin"],
      required: true,
    },
    isLocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);


export const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema);
