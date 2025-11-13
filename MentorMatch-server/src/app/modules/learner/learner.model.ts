import { Schema, model } from "mongoose";
import { ILearnerProfile, IReview } from "./learner.interface";

const learnerProfileSchema = new Schema<ILearnerProfile>(
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
    // Optional edit-time fields
    about: { type: String, default: undefined },
    topics: [String],
  },
  { timestamps: true }
);

// mentor review schema
const mentorReviewSchema = new Schema(
  {
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: "User", // mentor user reference
      required: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // learner user reference
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    helpfulBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);




// Review Schema
const reviewSchema = new Schema<IReview>(
  {
    gigId: {
      type: Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    helpfulBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Enable virtuals if you need to populate nested data later
reviewSchema.set("toJSON", { virtuals: true });
reviewSchema.set("toObject", { virtuals: true });




export const LearnerProfileModel = model<ILearnerProfile>(
  "LearnerProfile",
  learnerProfileSchema
);
export const MentorReviewModel = model("MentorReview", mentorReviewSchema);
export const ReviewModel = model<IReview>("Review", reviewSchema);
