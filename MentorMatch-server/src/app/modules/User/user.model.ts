import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "learner", "mentor"],
      required: true,
    },
    activeRole: {
      type: String,
      enum: ["learner", "mentor"],
      default: "learner", // default active role is learner
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);
