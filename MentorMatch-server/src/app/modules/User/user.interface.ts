import { Types } from "mongoose";
import { USER_ROLES} from "./user.constant";
import { ILearnerProfile } from "../learner/learner.interface";
import { IMentorProfile } from "../mentor/mentor.interface";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  role: "admin" | "learner" | "mentor";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface RegisterData {
  role: (typeof USER_ROLES)[keyof typeof USER_ROLES]; // "admin" | "learner" | "mentor"
  user: {
    email: string;
    password: string;
  };
  learnerProfile?: Omit<ILearnerProfile, "_id" | "user">;
  mentorProfile?: Omit<IMentorProfile, "_id" | "user" | "approvalStatus">;
}
