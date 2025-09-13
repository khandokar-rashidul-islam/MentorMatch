import AppError from "../../errors/AppError";
import { MentorProfileModel } from "../mentor/mentor.model";
import { APPROVAL_STATUS } from "../user/user.constant";
import { MentorSpecificData } from "../user/user.interface";
import { LearnerProfileModel } from "./learner.model";
import httpStatus from "http-status";



//* ------------ Learner applies to become Mentor later --------------------
export const applyMentorForExistingLearner = async (
  userId: string,
  mentorSpecific: MentorSpecificData
) => {
  const learner = await LearnerProfileModel.findOne({ user: userId });
    if (!learner) throw new AppError(httpStatus.NOT_FOUND, "Learner profile not found");

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
