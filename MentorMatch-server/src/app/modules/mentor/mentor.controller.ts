import * as mentorService from "./mentor.service";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthRequest } from "../user/user.interface";
import httpStatus from "http-status";

//* Create Gig
export const createGig = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;
  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");

  const gig = await mentorService.createGig(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Gig created successfully",
    data: gig,
  });
});

//* Update Gig
export const updateGig = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;
  const gigId = req.params.id;

  const gig = await mentorService.updateGig(gigId, userId!, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gig updated successfully",
    data: gig,
  });
});

//* Delete Gig
export const deleteGig = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;
  const gigId = req.params.id;

  await mentorService.deleteGig(gigId, userId!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gig deleted successfully",
    data: null,
  });
});

//* Get Single Gig
export const getGigById = catchAsync(async (req, res) => {
  const gig = await mentorService.getGigById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Gig fetched successfully",
    data: gig,
  });
});


//* Get My Gigs
export const getMyGigs = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;
  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");

  const gigs = await mentorService.getMyGigs(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your gigs fetched successfully",
    data: gigs,
  });
});
