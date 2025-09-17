import { Schema, model } from "mongoose";
import { ILearnerProfile } from "./learner.interface";

const learnerProfileSchema = new Schema<ILearnerProfile>(
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
    // Optional edit-time fields
    about: { type: String, default: undefined },
  },
  { timestamps: true }
);

export const LearnerProfileModel = model<ILearnerProfile>(
  "LearnerProfile",
  learnerProfileSchema
);
