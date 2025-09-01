import * as userService from "./user.service";
import { AuthRequest, RegisterData } from "./user.interface";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


//*user registration and login
export const registerUser = catchAsync( async (req , res) => {
  const registrationData = req.body as RegisterData;
  // Optional image
  if (req.file) {
    registrationData.profileImageFile = req.file; // pass file buffer to service
  }

  const result = await userService.registerUser(registrationData);
  // Set cookies
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered and logged in successfully!",
    data: { user: result.user, accessToken: result.accessToken },
  });
});





//* Admin approval for mentor
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


//* Admin rejection for mentor
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



//* Role switch (learner <-> mentor)
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
    secure: config.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Active role switched to ${user.activeRole}`,
    data: { user, accessToken },
  });
});