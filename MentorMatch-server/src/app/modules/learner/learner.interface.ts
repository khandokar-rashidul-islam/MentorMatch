import { Types } from "mongoose";

export interface ILearnerProfile {
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
}
