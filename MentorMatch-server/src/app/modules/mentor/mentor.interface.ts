import { Types } from "mongoose";
import { TApproval }  from "../user/user.constant";

// Core mentor fields (used for registration)
export interface IMentorProfileCore {
  user: Types.ObjectId;
  profileImage?: string;
  name: string;
  phone: string;
  birthDate?: string;
  nidOrBirthCertId?: string;
  bankAccountNo?: string;
  gender?: string;
  address?: string;
  education?: string;
  educationInstitute?: string;
  profession?: string;
  expertiseAreas?: string[];
  bio?: string;
  experienceYears?: number;
  portfolioLink?: string;
  approvalStatus: TApproval;
}

// Edit-time extra fields
export interface IMentorProfileExtra {
  about?: string;
  certifications?: string[];
  tutoringPlans?: string[];
  educationQualifications?: string[];
  frequentlyAskedQuestions?: { question: string; answer: string }[];
}

// Full mentor profile
export type IMentorProfile = IMentorProfileCore &
  IMentorProfileExtra & {
    _id?: Types.ObjectId;
  };
