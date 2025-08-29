import * as userService from "./user.service";
import { RegisterData } from "./user.interface";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { USER_ROLES } from "./user.constant";

//*user registration
export const registerUser = catchAsync( async (req , res) => {
  const registrationData = req.body as RegisterData;

  // Handle uploaded image if provided
  let profileImageUrl: string | undefined = undefined;
  if (req.file) {
 const uniqueImageName = `user-${req.body.email}-${Date.now()}`;
    const uploadedImage = await sendImageToCloudinary(
      uniqueImageName,
      req.file.path
    );
    profileImageUrl = uploadedImage.secure_url as string;
  }

  // Attach profileImage correctly based on role
  if (registrationData.role === USER_ROLES.LEARNER) {
    if (registrationData.learnerProfile) {
      registrationData.learnerProfile.profileImage = profileImageUrl;
    }
  }

  if (registrationData.role === USER_ROLES.MENTOR) {
    if (registrationData.mentorProfile) {
      registrationData.mentorProfile.profileImage = profileImageUrl;
    }
    if (registrationData.learnerProfile) {
      registrationData.learnerProfile.profileImage = profileImageUrl;
    }
  }

  const result = await userService.registerUser(registrationData);

  // Set access token in cookie
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 1 day, same as access token expiry
  });

  // Set refresh token in cookie (same as login)
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: { user: result.user, accessToken: result.accessToken },
  });
});





//* learner -> apply to become mentor (later)
export const applyMentorController = catchAsync(async (req, res) => {
    // const userId = req.user._id; // from auth middleware
    const { userId } = req.params; // for auth middleware
    const mentorSpecific = req.body; // { expertiseAreas, bio, experienceYears }

    const mentorProfile = await userService.applyMentorForExistingLearner(
      userId,
      mentorSpecific
    );

    // Send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Mentor application submitted successfully. Pending approval!",
      data: { mentorProfile },
    });

});




//*Admin approval for mentor
export const approveMentor =catchAsync( async (req, res) => {

    const { userId } = req.params;
    const mentorProfile = await userService.approveMentor(userId);
    const user = await userService.toggleRoleAndActiveRole(userId); // optional immediate switch

    // Send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Mentor approved!",
      data: {user, mentorProfile },
    });
});



//*role switch functionalities
export const toggleActiveRoleController = catchAsync(async (req, res) => {

    const { userId } = req.params;

    const user = await userService.toggleRoleAndActiveRole(userId);
    // Send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Role and active role switched to ${user.activeRole}`,
      data: { user },
    });
});
