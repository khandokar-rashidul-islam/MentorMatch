import { Schema, model } from "mongoose";
import { ILearnerProfile } from "./learner.interface.js";

const learnerProfileSchema = new Schema<ILearnerProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    profileImage: String,
    name: { type: String, required: [true, "Name is required"], unique: true },
    phone: {
      type: String,
      required: [true, "phone number is required"],
      unique: true,
    },
    birthDate: String,
    nidOrBirthCertId: { type: String, unique: true },
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
