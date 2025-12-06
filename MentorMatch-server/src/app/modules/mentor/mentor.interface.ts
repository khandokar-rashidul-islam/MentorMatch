import {Types } from "mongoose";
import { TApproval } from "../user/user.constant";

//* mentor Profile interfaces

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
  availability?: {
    day: string;
    time: string;
  }[];
  plans?: {
    instant?: {
      price: number;
      description: string;
      durationSessions: number;
      durationPerSessionMinutes: number;
      features: string[];
    };
    weekly?: {
      basic?: {
        price: number;
        description: string;
        durationSessions: number;
        durationPerSessionMinutes: number;
        features: string[];
      };
      intensive?: {
        price: number;
        description: string;
        durationSessions: number;
        durationPerSessionMinutes: number;
        features: string[];
      };
    };
    monthly?: {
      standard?: {
        price: number;
        description: string;
        durationSessions: number;
        durationPerSessionMinutes: number;
        features: string[];
      };
      premium?: {
        price: number;
        description: string;
        durationSessions: number;
        durationPerSessionMinutes: number;
        features: string[];
      };
      elite?: {
        price: number;
        description: string;
        durationSessions: number;
        durationPerSessionMinutes: number;
        features: string[];
      };
    };
  };
  faqs?: { question: string; answer: string }[];
}

//*gig related interfaces

export interface GigFaq {
  question: string;
  answer: string;
}

export interface GigPlan {
  price: number;
  description: string;
  features: string[];
}

export interface Gig {
  user: Types.ObjectId; // owner of the gig
  gigTitle: string;
  aboutGig: string;
  status: "active" | "paused";
  relatedTopics: string[];
  services: string[];
  keywords: string[];
  plans: {
    instant?: GigPlan;
    weekly?: {
      basic?: GigPlan;
      intensive?: GigPlan;
    };
    monthly?: {
      standard?: GigPlan;
      premium?: GigPlan;
      elite?: GigPlan;
    };
  };
  faqs: GigFaq[];
}

//* gig document interface
export interface GigDocument extends Gig, Document {}


//* Full mentor profile type
export type IMentorProfile = IMentorProfileCore &
  IMentorProfileExtra & {
    _id?: Types.ObjectId;
  };

