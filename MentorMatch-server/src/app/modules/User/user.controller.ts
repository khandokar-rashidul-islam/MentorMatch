import * as userService from "./user.service";
import { RegisterData } from "./user.interface";
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
  const { userId } = req.params; //letter this id should come from auth middleware not params
  const mentorProfile = await userService.approveMentorApplication(userId);
  //const user = await userService.toggleActiveRole(userId); 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor approved!",
    data: {mentorProfile },
  });
});



//* Admin rejection for mentor
export const rejectMentor = catchAsync(async (req, res) => {
  const { userId } = req.params; //letter this id should come from auth middleware not params

  const mentorProfile = await userService.rejectMentorApplication(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mentor rejected!",
    data:{ mentorProfile},
  });
});



//* Role switch (learner <-> mentor)

export const toggleActiveRole = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await userService.toggleActiveRole(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Active role switched to ${user.activeRole}`,
    data: { user },
  });
});
