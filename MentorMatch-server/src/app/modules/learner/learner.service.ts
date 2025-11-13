import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { GigModel, MentorProfileModel } from "../mentor/mentor.model";
import { APPROVAL_STATUS } from "../user/user.constant";
import { MentorSpecificData } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { ICreateReviewInput } from "./learner.interface";
import {
  LearnerProfileModel,
  MentorReviewModel,
  ReviewModel,
} from "./learner.model";
import httpStatus from "http-status";

//* ------------ Learner applies to become Mentor later --------------------
export const applyMentorForExistingLearner = async (
  userId: string,
  mentorSpecific: MentorSpecificData
) => {
  const learner = await LearnerProfileModel.findOne({ user: userId });
  if (!learner)
    throw new AppError(httpStatus.NOT_FOUND, "Learner profile not found");

  const existingMentor = await MentorProfileModel.findOne({ user: userId });
  if (existingMentor) {
    if (existingMentor.approvalStatus === APPROVAL_STATUS.REJECTED) {
      existingMentor.set({
        ...learner.toObject(), // learner fields
        ...mentorSpecific, // mentor-specific
        approvalStatus: APPROVAL_STATUS.PENDING,
      });
      await existingMentor.save();
      return existingMentor;
    }
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Mentor profile already exists or is pending/approved"
    );
  }

  const newMentor = await MentorProfileModel.create({
    ...learner.toObject(), // copy learner info
    ...mentorSpecific, // mentor-specific fields
    approvalStatus: APPROVAL_STATUS.PENDING,
  });

  return newMentor;
};

//*------------get mentor public profile by id (for learner to view)--------------

export const getMentorById = async (mentorId: string) => {
  const mentor = await MentorProfileModel.findOne({ user: mentorId });

  if (!mentor) {
    throw new AppError(httpStatus.NOT_FOUND, "Mentor not found");
  }

  return {
    user: {
      profile: mentor,
    },
  };
};

//* Get All Gigs (public)
export const getAllGigs = async (filter: Record<string, unknown> = {}) => {
  const gigs = await GigModel.find(filter).populate({
    path: "user",
    select: "email",
    populate: {
      path: "mentorProfile",
      select: "name profileImage profession bio address",
    },
  });
  return gigs;
};

//* get gigs by mentor id (public) */

export const getGigsByUserId = async (userId: string) => {
  // Find gigs where the user matches the provided userId
  const gigs = await GigModel.find({ user: userId }).populate({
    path: "user",
    select: "email activeRole",
    populate: {
      path: "mentorProfile",
      select: "name profileImage profession bio address topics experience",
    },
  });

  if (!gigs || gigs.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No gigs found for this user");
  }

  return gigs;
};

//* ------------ Learner submits review for a gig --------------------

/**
 * Create a review for a gig.
 * - Only users with 'learner' role can review.
 * - User cannot review their own gig.
 * - Prevent duplicate review.
 * - Recalculate gig average & totalReviews.
 * - Return populated review (with reviewer learner data).
 */
export const createReviewService = async ({
  gigId,
  userId,
  rating,
  comment,
}: ICreateReviewInput) => {
  // basic validation
  if (!rating || rating < 1 || rating > 5) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Rating must be between 1 and 5"
    );
  }

  const [user, gig] = await Promise.all([
    UserModel.findById(userId).select("role"),
    GigModel.findById(gigId).select("user"), // gig.user is owner id
  ]);

  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
  if (!gig) throw new AppError(httpStatus.NOT_FOUND, "Gig not found");

  // only learners can submit reviews
  if (!Array.isArray(user.role) || !user.role.includes("learner")) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only learners can submit reviews"
    );
  }

  // prevent reviewing own gig (user could be both mentor & learner)
  if (gig.user && gig.user.toString() === userId.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, "You cannot review your own gig");
  }

  // prevent duplicate review by same user for same gig
  const existing = await ReviewModel.findOne({ gigId, reviewerId: userId });
  if (existing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already reviewed this gig"
    );
  }

  // create review (helpful defaults to 0 in model)
  const created = await ReviewModel.create({
    gigId,
    reviewerId: userId,
    rating,
    comment,
  });

  // recompute aggregate stats for gig (average & total)
  const agg = await ReviewModel.aggregate([
    { $match: { gigId: created.gigId } },
    {
      $group: {
        _id: "$gigId",
        avgRating: { $avg: "$rating" },
        total: { $sum: 1 },
      },
    },
  ]);

  const avg = agg[0]?.avgRating ?? 0;
  const total = agg[0]?.total ?? 0;

  await GigModel.findByIdAndUpdate(created.gigId, {
    averageRating: Number(avg.toFixed(2)),
    totalReviews: total,
  }).catch(() => {
    // swallow update errors — review creation shouldn't fail because of stats update
  });

  // return the created review populated with reviewer learner data
  const populated = await ReviewModel.findById(created._id).populate({
    path: "reviewerId",
    select: "email role",
    populate: {
      path: "learnerProfile",
      model: "LearnerProfile",
      select: "name profileImage profession",
      justOne: true,
    },
  });

  return populated;
};

export const getReviewsByGigService = async (gigId: string) => {
  // find reviews and populate reviewer -> learnerProfile
  const reviews = await ReviewModel.find({ gigId })
    .populate({
      path: "reviewerId",
      select: "email", // base user
      populate: {
        path: "learnerProfile", // assumes userSchema.virtual('learnerProfile'...) exists
        model: "LearnerProfile",
        select: "name profileImage profession",
        justOne: true,
      },
    })
    .sort({ createdAt: -1 });

  if (!reviews || reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      reviews: [],
    };
  }

  const totalReviews = reviews.length;
  const ratingSum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  const averageRating = totalReviews ? ratingSum / totalReviews : 0;

  // count ratings
  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const rt = Math.min(5, Math.max(1, Number(r.rating || 0)));
    ratingCounts[rt] = (ratingCounts[rt] || 0) + 1;
  });

  // convert counts to percentages (rounded)
  const ratingBreakdown: Record<number, number> = {};

  for (let i = 5; i >= 1; i--) {
    ratingBreakdown[i] = Math.round((ratingCounts[i] / totalReviews) * 100);
  }

  return {
    averageRating,
    totalReviews,
    ratingBreakdown,
    reviews,
  };
};

/**
 * Increment "helpful" count for a review
 * (optional — invoked when user clicks Helpful)
 */
export const toggleHelpfulService = async (
  reviewId: string,
  userId: string
) => {
  const review = await ReviewModel.findById(reviewId);
  if (!review) throw new AppError(httpStatus.NOT_FOUND, "Review not found");

  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User ID is required");

  // Initialize helpfulBy array if missing
  if (!Array.isArray(review.helpfulBy)) review.helpfulBy = [];

  // Check if user already marked helpful
  const index = review.helpfulBy.findIndex((id) => id.toString() === userId);
  if (index === -1) {
    // Not marked yet → add
    review.helpfulBy.push(new mongoose.Types.ObjectId(userId));
  } else {
    // Already marked → remove
    review.helpfulBy.splice(index, 1);
  }

  // Update total helpful count
  review.helpful = review.helpfulBy.length;

  await review.save();

  return review;
};

//* ------------ Learner gives feedback for mentor (after session completed) --------------------
// create mentor review
export const createMentorReviewService = async ({
  mentorId,
  userId,
  rating,
  comment,
}: {
  mentorId: string;
  userId: string;
  rating: number;
  comment?: string;
}) => {
  // validation
  if (!rating || rating < 1 || rating > 5) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Rating must be between 1 and 5"
    );
  }

  const [reviewer, mentor] = await Promise.all([
    UserModel.findById(userId).select("role"),
    UserModel.findById(mentorId).select("activeRole"),
  ]);

  if (!reviewer) throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
  if (!mentor) throw new AppError(httpStatus.NOT_FOUND, "Mentor not found");

  if (mentor.activeRole !== "mentor") {
    throw new AppError(httpStatus.BAD_REQUEST, "Target user is not a mentor");
  }

  // only learners can review mentors
  if (!Array.isArray(reviewer.role) || !reviewer.role.includes("learner")) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only learners can review mentors"
    );
  }

  // prevent self-review
  if (mentorId.toString() === userId.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, "You cannot review yourself");
  }

  // prevent duplicate review
  const existing = await MentorReviewModel.findOne({
    mentorId,
    reviewerId: userId,
  });
  if (existing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You already reviewed this mentor"
    );
  }

  // create review
  const created = await MentorReviewModel.create({
    mentorId,
    reviewerId: userId,
    rating,
    comment,
  });

  // compute updated averages
  const agg = await MentorReviewModel.aggregate([
    { $match: { mentorId: created.mentorId } },
    {
      $group: {
        _id: "$mentorId",
        avgRating: { $avg: "$rating" },
        total: { $sum: 1 },
      },
    },
  ]);

  const avg = agg[0]?.avgRating ?? 0;
  const total = agg[0]?.total ?? 0;

  // optionally update mentorProfile with average rating
  await MentorProfileModel.findOneAndUpdate(
    { user: mentorId },
    { averageRating: avg.toFixed(2), totalReviews: total },
    { new: true }
  ).catch(() => {});

  // populate reviewer
  const populated = await MentorReviewModel.findById(created._id).populate({
    path: "reviewerId",
    select: "email",
    populate: {
      path: "learnerProfile",
      select: "name profileImage profession",
    },
  });

  return populated;
};
//fetch mentor reviews
export const getReviewsByMentorService = async (mentorId: string) => {
  const reviews = await MentorReviewModel.find({ mentorId })
    .populate({
      path: "reviewerId",
      select: "email",
      populate: {
        path: "learnerProfile",
        select: "name profileImage profession",
      },
    })
    .sort({ createdAt: -1 });

  if (!reviews.length) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      reviews: [],
    };
  }

  const totalReviews = reviews.length;
  const ratingSum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  const averageRating = totalReviews ? ratingSum / totalReviews : 0;

  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const rt = Math.min(5, Math.max(1, Number(r.rating || 0)));
    ratingCounts[rt] = (ratingCounts[rt] || 0) + 1;
  });

  const ratingBreakdown: Record<number, number> = {};
  for (let i = 5; i >= 1; i--) {
    ratingBreakdown[i] = Math.round((ratingCounts[i] / totalReviews) * 100);
  }

  return {
    averageRating,
    totalReviews,
    ratingBreakdown,
    reviews,
  };
};
//mentor helpful count for a review
export const MentorToggleHelpful = async (reviewId: string, userId: string) => {
  const review = await MentorReviewModel.findById(reviewId);
  if (!review) throw new AppError(httpStatus.NOT_FOUND, "Review not found");
  
  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User ID is required");

  const alreadyMarked = review.helpfulBy.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyMarked) {
    // User already marked as helpful → remove it
    review.helpfulBy = review.helpfulBy.filter(
      (id) => id.toString() !== userId.toString()
    );
    review.helpful = Math.max(0, review.helpful - 1);
  } else {
    //  User not marked yet → add
    review.helpfulBy.push(new mongoose.Types.ObjectId(userId));
    review.helpful += 1;
  }

  await review.save();
  return review;
};