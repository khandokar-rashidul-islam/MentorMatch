/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";
import { ILearnerProfile } from "../learner/learner.interface";
import { IMentorProfile } from "../mentor/mentor.interface";
import { TUserRole } from "./user.constant";
import { Request } from "express";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password : string;
  role: TUserRole[];
  activeRole: "learner" | "mentor"; // currently active role
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface RegisterData {
  profileImageFile: Express.Multer.File;
  role: TUserRole[];
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

// Common type for req.user
export interface AuthUserPayload {
  id: string;            // _id of user/admin
  email?: string;
  name?: string;
  role?: TUserRole[];         // array of roles
  activeRole?: TUserRole | string; 
}

// Updated AuthRequest
export interface AuthRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: AuthUserPayload;
}