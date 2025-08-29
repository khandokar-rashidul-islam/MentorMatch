import { Types } from "mongoose";
import { ILearnerProfile } from "../learner/learner.interface";
import { IMentorProfile } from "../mentor/mentor.interface";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  role: "admin" | "learner" | "mentor"; // selected role
  activeRole: "learner" | "mentor"; // currently active role
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface RegisterData {
  role: IUser["role"];
  user: { email: string; password: string };
  learnerProfile?: Omit<ILearnerProfile, "_id" | "user">;
  mentorProfile?: Omit<IMentorProfile, "_id" | "user" | "approvalStatus">;
}
// mentor-specific input type
export interface MentorSpecificData {
  expertiseAreas: string[];
  bio: string;
  experienceYears: number;
}
