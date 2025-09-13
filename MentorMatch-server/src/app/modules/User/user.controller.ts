/* eslint-disable @typescript-eslint/no-explicit-any */
import * as userService from "./user.service";
import { AuthRequest, RegisterData } from "./user.interface";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

//*-----------------user registration and login-----------------------

export const registerUser = catchAsync(async (req, res) => {
  const registrationData = req.body as RegisterData;
  // Optional image
  if (req.file) {
    registrationData.profileImageFile = req.file; // pass file buffer to service
  }

  const result = await userService.registerUser(registrationData);

  //Set cookies

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // false in dev
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: "/",
  });
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // false in dev
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered and logged in successfully!",
    data: {
      user: result.user,
      // accessToken: result.accessToken,
    },
  });
});

//* ---------------------Admin approval for mentor---------------------

export const approveMentor = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const adminId = authReq.user?.id; // logged-in admin ID
  if (!adminId) throw new Error("Admin ID not found in request");

  const { mentorUserId } = req.params; // mentor user ID from URL
  if (!mentorUserId) throw new Error("Mentor user ID is required");

  const mentorProfile =
    await userService.approveMentorApplication(mentorUserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor approved!",
    data: { mentorProfile },
  });
});

//* ------------------------Admin rejection for mentor--------------------

export const rejectMentor = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const adminId = authReq.user?.id; // logged-in admin ID
  if (!adminId) throw new Error("Admin ID not found in request");

  const { mentorUserId } = req.params; // mentor user ID from URL
  if (!mentorUserId) throw new Error("Mentor user ID is required");

  const mentorProfile = await userService.rejectMentorApplication(mentorUserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor rejected!",
    data: { mentorProfile },
  });
});

//* --------------------Role switch (learner <-> mentor)------------------------

export const toggleActiveRole = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  // Use authenticated user ID
  const userId = authReq.user?.id;

  if (!userId) throw new Error("User ID not found in request");

  // Toggle active role
  const { user, accessToken } = await userService.toggleActiveRole(userId);

  // Update cookie with new access token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // false in dev
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: "/",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Active role switched to ${user.activeRole}`,
    data: { user },
  });
});

// * -------------------- Get user profile based on active role --------------------

export const getProfile = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user?.id;
  if (!userId) throw new Error("User ID not found in request");

  const profile = await userService.getProfile(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Active role profile fetched successfully",
    data: profile,
  });
});

//*----------------------- Edit profile based on role-------------------------------

export const editProfileController = catchAsync(async (req, res) => {
  const authReq = req as any;
  const userId = authReq.user?.id;
  if (!userId) throw new AppError(404, "User not found");

  const activeRole = authReq.user?.activeRole as "mentor" | "learner";
  const updateData = req.body;
  const file = req.file;

  const updatedProfile = await userService.editProfile(
    userId,
    activeRole,
    updateData,
    file
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${activeRole} Profile updated successfully`,
    data: updatedProfile,
  });
});
