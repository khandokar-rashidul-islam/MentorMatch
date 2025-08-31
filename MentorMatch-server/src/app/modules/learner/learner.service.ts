import { MentorProfileModel } from "../mentor/mentor.model";
import { APPROVAL_STATUS } from "../user/user.constant";
import { MentorSpecificData } from "../user/user.interface";
import { LearnerProfileModel } from "./learner.model";


//* ------------ Learner applies to become Mentor later --------------------
export const applyMentorForExistingLearner = async (
  userId: string,
  mentorSpecific: MentorSpecificData
) => {
  // 1. Fetch learner profile
  const learner = await LearnerProfileModel.findOne({ user: userId });
  if (!learner) {
    throw new Error("Learner profile not found");
  }

  // 2. Check if mentor profile already exists
  const existingMentor = await MentorProfileModel.findOne({ user: userId });
  if (existingMentor) {
    if (existingMentor.approvalStatus === APPROVAL_STATUS.REJECTED) {
      // if rejected, update and set back to pending
      existingMentor.set({
        ...mentorSpecific,
        ...learner.toObject(),
        approvalStatus: APPROVAL_STATUS.PENDING,
      });
      await existingMentor.save();
      return existingMentor;
    }
    throw new Error("Mentor profile already exists or is pending/approved");
  }

  // 3. Merge learner data + mentor-specific fields
  const mergedMentorData = {
    user: learner.user,
    name: learner.name,
    phone: learner.phone,
    birthDate: learner.birthDate,
    gender: learner.gender,
    address: learner.address,
    education: learner.education,
    educationInstitute: learner.educationInstitute,
    profession: learner.profession,
    nidOrBirthCertId: learner.nidOrBirthCertId,
    bankAccountNo: learner.bankAccountNo,
    profileImage: learner.profileImage,
    // mentor-specific fields
    ...mentorSpecific,
    approvalStatus: APPROVAL_STATUS.PENDING, //wait for admin approval
  };

  // 4. Create mentor profile
  const createdMentor = await MentorProfileModel.create(mergedMentorData);
  return createdMentor;
};