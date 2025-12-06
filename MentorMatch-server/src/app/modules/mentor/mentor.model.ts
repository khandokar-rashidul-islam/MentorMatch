import { Schema, model } from "mongoose";
import { GigDocument, IMentorProfile } from "./mentor.interface";
import { APPROVAL_STATUS } from "../user/user.constant";

// Mongoose schema definition for MentorProfile
const mentorProfileSchema = new Schema<IMentorProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    profileImage: String,
    name: { type: String, required: true },
    phone: { type: String, required: true },
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
    availability: [
      {
        day: String,
        time: String,
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

// gig related schemas
const GigSchema = new Schema<GigDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gigTitle: { type: String, required: true, trim: true },
    aboutGig: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "paused"],
      default: "active",
    },
    relatedTopics: [{ type: String }],
    services: [{ type: String }],
    keywords: [{ type: String }],
    plans: {
      instant: {
        price: Number,
        description: String,
        durationSessions: Number,
        durationPerSessionMinutes: Number,
        features: [String],
      },
      weekly: {
        basic: {
          price: Number,
          description: String,
          durationSessions: Number,
          durationPerSessionMinutes: Number,
          features: [String],
        },
        intensive: {
          price: Number,
          description: String,
          durationSessions: Number,
          durationPerSessionMinutes: Number,
          features: [String],
        },
      },
      monthly: {
        standard: {
          price: Number,
          description: String,
          durationSessions: Number,
          durationPerSessionMinutes: Number,
          features: [String],
        },
        premium: {
          price: Number,
          description: String,
          durationSessions: Number,
          durationPerSessionMinutes: Number,
          features: [String],
        },
        elite: {
          price: Number,
          description: String,
          durationSessions: Number,
          durationPerSessionMinutes: Number,
          features: [String],
        },
      },
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// gig model
export const GigModel = model<GigDocument>("Gig", GigSchema);
// MentorProfile model
export const MentorProfileModel = model<IMentorProfile>(
  "MentorProfile",
  mentorProfileSchema
);
