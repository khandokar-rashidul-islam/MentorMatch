import * as learnerService from "./learner.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthRequest } from "../user/user.interface";
import AppError from "../../errors/AppError";


//* learner -> apply to become mentor (later)
export const applyLearnerToMentor = catchAsync(async (req, res) => {

   const authReq = req as AuthRequest;
   const userId = authReq.user?.id;

if (!userId) throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");

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
