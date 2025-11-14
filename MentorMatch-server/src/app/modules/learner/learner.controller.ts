import * as learnerService from "./learner.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthRequest } from "../user/user.interface";
import AppError from "../../errors/AppError";

//*--------------learner -> apply to become mentor (later)------------------------
export const applyLearnerToMentor = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;

  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");

  const mentorSpecific = req.body; // { expertiseAreas, bio, experienceYears }

  const mentorProfile = await learnerService.applyMentorForExistingLearner(
    userId,
    mentorSpecific
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor application submitted successfully. Pending approval!",
    data: { mentorProfile },
  });
});




//*--------- get all mentor wih query ---------------------------------------
export const getAllMentors = catchAsync(async (req, res) => {
  const result = await learnerService.getAllMentorsService(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentors fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

//*---------- get mentor public profile by id (for learner to view)-----------------
export const getMentorById = catchAsync(async (req, res) => {
  const { mentorId } = req.params;

  const mentor = await learnerService.getMentorById(mentorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor details fetched successfully",
    data: mentor,
  });
});




//*-------------------------- Get all gigs-----------------------------------------
//Get All Gigs (public)
export const getAllGigs = catchAsync(async (req, res) => {
  const gigs = await learnerService.getAllGigs(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gigs fetched successfully",
    data: gigs,
  });
});

//get gigs by mentor id (public)
export const getGigsByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const gigs = await learnerService.getGigsByUserId(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gigs fetched successfully for this user",
    data: gigs,
  });
});






//* ---------------------- learner submit review for a gig---------------------------------------*/

//Create a new review (only learner can, and not for own gig)
export const createReview = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;

  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");

  const { gigId } = req.params;
  const { rating, comment } = req.body;

  if (!gigId) throw new AppError(httpStatus.BAD_REQUEST, "Gig ID is required");

  const review = await learnerService.createReviewService({
    gigId,
    userId,
    rating,
    comment,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review submitted successfully",
    data: review,
  });
});

// Get all reviews for a specific gig
export const getReviewsByGig = catchAsync(async (req, res) => {
  const { gigId } = req.params;

  if (!gigId) throw new AppError(httpStatus.BAD_REQUEST, "Gig ID is required");

  const data = await learnerService.getReviewsByGigService(gigId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews fetched successfully",
    data,
  });
});

// toggle helpful count for a review
export const toggleHelpful = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;

  if (!reviewId)
    throw new AppError(httpStatus.BAD_REQUEST, "Review ID is required");
  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");

  const updatedReview = await learnerService.toggleHelpfulService(
    reviewId,
    userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Toggled helpful successfully",
    data: updatedReview,
  });
});






//*----------------learner give feedback for mentor (after session completed)----------------------

export const createMentorReview = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;

  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");

  const { mentorId } = req.params;
  const { rating, comment } = req.body;

  const review = await learnerService.createMentorReviewService({
    mentorId,
    userId,
    rating,
    comment,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Mentor review submitted successfully",
    data: review,
  });
});

export const getReviewsByMentor = catchAsync(async (req, res) => {
  const { mentorId } = req.params;

  const data = await learnerService.getReviewsByMentorService(mentorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor reviews fetched successfully",
    data,
  });
});

// mentor helpful count for a review
export const MentorToggleHelpful = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user?.id; 

  if (!reviewId)
    throw new AppError(httpStatus.BAD_REQUEST, "Review ID is required");

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
  }
  const updatedReview = await learnerService.MentorToggleHelpful(
    reviewId,
    userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Toggled helpful successfully",
    data: updatedReview,
  });
});
