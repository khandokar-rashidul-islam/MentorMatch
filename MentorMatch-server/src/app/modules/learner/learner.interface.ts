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



// Review interface

export interface ICreateReviewInput {
  gigId: string;
  userId: string;
  rating: number;
  comment?: string;
}

export interface IReview {
  gigId: Types.ObjectId;
  reviewerId: Types.ObjectId;
  rating: number;
  comment: string;
  helpful?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Edit-time extra fields
export interface ILearnerProfileExtra {
  about?: string;
  topics?:string[];
}

// Full learner profile
export type ILearnerProfile = ILearnerProfileCore &
  ILearnerProfileExtra & {
    _id?: Types.ObjectId;
  };
