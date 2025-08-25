import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { UserModel } from "./user.model";
import { USER_ROLES, APPROVAL_STATUS, USER_STATUS } from "./user.constant";
import { RegisterData } from "./user.interface";
import { LearnerProfileModel } from "../learner/learner.model";
import { ILearnerProfile } from "../learner/learner.interface";
import { MentorProfileModel } from "../mentor/mentor.model";
import { IMentorProfile } from "../mentor/mentor.interface";

// Learner
const createLearnerProfile = async (
  userId: Types.ObjectId,
  profile: Omit<ILearnerProfile, "_id" | "user">
) => {
  return LearnerProfileModel.create({ user: userId, ...profile });
};

// Mentor
const createMentorProfile = async (
  userId: Types.ObjectId,
  profile: Omit<IMentorProfile, "_id" | "user" | "approvalStatus">,
  approvalStatus: string = APPROVAL_STATUS.PENDING
) => {
  return MentorProfileModel.create({
    user: userId,
    ...profile,
    approvalStatus,
  });
};

export const registerUser = async (data: RegisterData) => {
  const { role, user, learnerProfile, mentorProfile } = data;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );

    const newUser = await UserModel.create(
      [
        {
          email: user.email,
          password: hashedPassword,
          role,
          status: USER_STATUS.IN_PROGRESS,
          isDeleted: false,
        },
      ],
      { session }
    );

    const createdUser = newUser[0];

    // Learner profile creation
    if (role === USER_ROLES.LEARNER) {
      if (!learnerProfile) {
        throw new Error("Learner profile is required for learner role");
      }
      await createLearnerProfile(createdUser._id, learnerProfile);
    }

    // Mentor profile creation
    if (role === USER_ROLES.MENTOR) {
      if (!mentorProfile) {
        throw new Error("Mentor profile is required for mentor role");
      }
      await createMentorProfile(
        createdUser._id,
        mentorProfile,
        APPROVAL_STATUS.PENDING
      );
    }

    await session.commitTransaction();
    session.endSession();

    return createdUser;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
