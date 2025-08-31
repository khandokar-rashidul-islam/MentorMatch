import * as learnerService from "./learner.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";



//* learner -> apply to become mentor (later)
export const applyLearnerToMentor = catchAsync(async (req, res) => {
  // const userId = req.user._id; // from auth middleware
  const { userId } = req.params; // for auth middleware
  const mentorSpecific = req.body; // { expertiseAreas, bio, experienceYears }

  const mentorProfile = await learnerService.applyMentorForExistingLearner(
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
