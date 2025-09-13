import { Types } from "mongoose";

// Core learner fields (used for registration)
export interface ILearnerProfileCore {
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
}

// Edit-time extra fields
export interface ILearnerProfileExtra {
  about?: string;
  certifications?: string[];
  tutoringPlans?: string[];
  educationQualifications?: string[];
  frequentlyAskedQuestions?: { question: string; answer: string }[];
}

// Full learner profile
export type ILearnerProfile = ILearnerProfileCore &
  ILearnerProfileExtra & {
    _id?: Types.ObjectId;
  };
