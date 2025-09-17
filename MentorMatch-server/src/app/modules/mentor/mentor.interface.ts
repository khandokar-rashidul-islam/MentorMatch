import { Types } from "mongoose";
import { TApproval } from "../user/user.constant";

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
  skills?: string[];
  certifications?: {
    name: string;
    organization: string;
    year: string;
    credentialId: string;
  }[];
  educationDetails?: {
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }[];
  plans?: {
    instant?: {
      price: number;
      description: string;
      features: string[];
    };
    weekly?: {
      basic?: {
        price: number;
        description: string;
        features: string[];
      };
      intensive?: {
        price: number;
        description: string;
        features: string[];
      };
    };
    monthly?: {
      standard?: {
        price: number;
        description: string;
        features: string[];
      };
      premium?: {
        price: number;
        description: string;
        features: string[];
      };
      elite?: {
        price: number;
        description: string;
        features: string[];
      };
    };
  };
  faqs?: { question: string; answer: string }[];
}

// Full mentor profile type
export type IMentorProfile = IMentorProfileCore &
  IMentorProfileExtra & {
    _id?: Types.ObjectId;
  };
