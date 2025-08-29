import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
// import AppError from "../../errors/AppError";
// import httpStatus from "http-status";
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

// userSchema.pre("save", async function (next) {
//   const isUserExist = await UserModel.findOne({
//     email: this.email,
//   });

//   if (isUserExist) {
//     throw new AppError(httpStatus.NOT_FOUND, "This user is already exist!");
//   }
//   next();
// });


export const UserModel = model<IUser>("User", userSchema);
