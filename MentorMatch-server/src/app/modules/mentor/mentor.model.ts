import { Schema, model } from "mongoose";
import { IMentorProfile } from "./mentor.interface";
import { APPROVAL_STATUS } from "../user/user.constant";

const mentorProfileSchema = new Schema<IMentorProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    profileImage: String,
    name: { type: String, required: [true, "Name is required"], unique: true },
    phone: { type: String, required: [true, "phone is required"], unique: true },
    birthDate: String,
    nidOrBirthCertId: { type: String, unique: true },
    bankAccountNo: String,
    gender: String,
    address: String,
    education: String,
    educationInstitute: String,
    profession: String,
    expertiseAreas: [String],
    bio: String,
    experienceYears: Number,
    portfolioLink: String,
    approvalStatus: {
      type: String,
      enum: Object.values(APPROVAL_STATUS),
      default: APPROVAL_STATUS.PENDING,
    },
  },
  { timestamps: true }
);

export const MentorProfileModel = model<IMentorProfile>(
  "MentorProfile",
  mentorProfileSchema
);
