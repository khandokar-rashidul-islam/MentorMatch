import { Schema, model } from "mongoose";
import { ILearnerProfile } from "./learner.interface.js";

const learnerProfileSchema = new Schema<ILearnerProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    profileImage: String,
    name: { type: String, required: true },
    phone: String,
    birthDate: String,
    nidOrBirthCertId: String,
    bankAccountNo: String,
    gender: String,
    address: String,
    education: String,
    educationInstitute: String,
    profession: String,
  },
  { timestamps: true }
);

export const LearnerProfileModel = model<ILearnerProfile>(
  "LearnerProfile",
  learnerProfileSchema
);
