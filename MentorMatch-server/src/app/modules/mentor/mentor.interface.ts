import { Types } from "mongoose";

export interface IMentorProfile {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  profileImage?: string;
  name: string;
  phone?: string;
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
  approvalStatus: "pending" | "approved" | "rejected";
}

