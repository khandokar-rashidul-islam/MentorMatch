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
    name: { type: String, required: true},
    phone: { type: String, required: true, unique: true },
    birthDate: String,
    nidOrBirthCertId: String,
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

    // Edit-time extra fields
    about: String,
    skills: [String],
    certifications: [
      {
        name: String,
        organization: String,
        year: String,
        credentialId: String,
      },
    ],
    educationDetails: [
      {
        degree: String,
        institution: String,
        year: String,
        gpa: String,
      },
    ],
    plans: {
      instant: {
        price: Number,
        description: String,
        features: [String],
      },
      weekly: {
        basic: {
          price: Number,
          description: String,
          features: [String],
        },
        intensive: {
          price: Number,
          description: String,
          features: [String],
        },
      },
      monthly: {
        standard: {
          price: Number,
          description: String,
          features: [String],
        },
        premium: {
          price: Number,
          description: String,
          features: [String],
        },
        elite: {
          price: Number,
          description: String,
          features: [String],
        },
      },
    },
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export const MentorProfileModel = model<IMentorProfile>(
  "MentorProfile",
  mentorProfileSchema
);
