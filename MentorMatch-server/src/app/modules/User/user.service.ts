import mongoose, { Types, ClientSession } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { UserModel } from "./user.model";
import { USER_ROLES, APPROVAL_STATUS, USER_STATUS } from "./user.constant";
import { MentorSpecificData, RegisterData } from "./user.interface";
import { LearnerProfileModel } from "../learner/learner.model";
import { MentorProfileModel } from "../mentor/mentor.model";
import { ILearnerProfile } from "../learner/learner.interface";
import { IMentorProfile } from "../mentor/mentor.interface";
import { JwtPayload } from "../auth/auth.interface";
import { createToken } from "../auth/auth.utils";


// -- helpers that accept session so all writes are atomic
const createLearnerProfile = (
  userId: Types.ObjectId,
  profile: Omit<ILearnerProfile, "_id" | "user">,
  session: ClientSession
) => {
  return LearnerProfileModel.create([{ user: userId, ...profile }], {
    session,
  });
};

const createMentorProfile = (
  userId: Types.ObjectId,
  profile: Omit<IMentorProfile, "_id" | "user" | "approvalStatus">,
  session: ClientSession,
  approvalStatus: string = APPROVAL_STATUS.PENDING
) => {
  return MentorProfileModel.create(
    [{ user: userId, ...profile, approvalStatus }],
    { session }
  );
};

// map mentor common fields → fallback learner profile
const mapCommonFromMentor = (
  mentorProfile: Omit<IMentorProfile, "_id" | "user" | "approvalStatus">
): Omit<ILearnerProfile, "_id" | "user"> => ({
  name: mentorProfile.name,
  phone: mentorProfile.phone,
  birthDate: mentorProfile.birthDate,
  gender: mentorProfile.gender,
  address: mentorProfile.address,
  education: mentorProfile.education,
  educationInstitute: mentorProfile.educationInstitute,
  profession: mentorProfile.profession,
  profileImage: "",
  nidOrBirthCertId: mentorProfile.nidOrBirthCertId,
  bankAccountNo: mentorProfile.bankAccountNo,
});

// -------------------- Register and login User --------------------
export const registerUser = async (data: RegisterData) => {
  const { role, user, learnerProfile, mentorProfile } = data;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 1) Hash password
    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );

    // 2) Create user
    const [createdUser] = await UserModel.create(
      [
        {
          email: user.email,
          password: hashedPassword,
          role,
          activeRole: "learner",
          status: USER_STATUS.IN_PROGRESS,
          isDeleted: false,
        },
      ],
      { session }
    );

    // 3) Create profiles based on role
    if (role === USER_ROLES.LEARNER) {
      if (!learnerProfile) throw new Error("Learner profile required");
      await createLearnerProfile(createdUser._id, learnerProfile, session);
    } else if (role === USER_ROLES.MENTOR) {
      if (!mentorProfile) throw new Error("Mentor profile required");
      await createMentorProfile(
        createdUser._id,
        mentorProfile,
        session,
        APPROVAL_STATUS.PENDING
      );

      // Fallback learner profile from mentor
      const fallbackLearner = mapCommonFromMentor(mentorProfile);
      await createLearnerProfile(createdUser._id, fallbackLearner, session);
    }

    // Commit transaction
    await session.commitTransaction();

    // --- Auto-login: create JWT tokens ---
    const jwtPayload: JwtPayload = {
      userId: createdUser._id.toString(),
      role: createdUser.role,
      activeRole: "learner",
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    return { user: createdUser, accessToken, refreshToken };
  } catch (err: unknown) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

// -------------------- Learner applies to become Mentor later --------------------
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

    approvalStatus: APPROVAL_STATUS.PENDING,
  };

  // 4. Create mentor profile
  const createdMentor = await MentorProfileModel.create(mergedMentorData);
  return createdMentor;
};


// -------------------- Approve Mentor (Admin) --------------------
export const approveMentor = async (userId: string) => {
  const mentorProfile = await MentorProfileModel.findOne({ user: userId });
  if (!mentorProfile) throw new Error("Mentor profile not found");

  mentorProfile.approvalStatus = APPROVAL_STATUS.APPROVED;
  await mentorProfile.save();
  return mentorProfile;
};

// -------------------- Switch Active Role --------------------
// export const toggleActiveRole = async (userId: string) => {
//   const user = await UserModel.findById(userId);
//   if (!user) throw new Error("User not found");

//   // Determine the role to switch to
//   const targetRole: "learner" | "mentor" =
//     user.activeRole === "learner" ? "mentor" : "learner";

//   // If switching to mentor, ensure mentor profile exists & approved
//   if (targetRole === "mentor") {
//     const mentorProfile = await MentorProfileModel.findOne({ user: userId });
//     if (!mentorProfile) throw new Error("Mentor profile not found");
//     if (mentorProfile.approvalStatus !== APPROVAL_STATUS.APPROVED) {
//       throw new Error("Mentor not approved yet");
//     }
//   }

//   user.activeRole = targetRole;
//   await user.save();

//   return user;
// };
// Toggle both role and activeRole
export const toggleRoleAndActiveRole = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  let targetRole: "learner" | "mentor";

  if (user.activeRole === "learner") {
    // Check if mentor profile exists and is approved
    const mentorProfile = await MentorProfileModel.findOne({ user: userId });
    if (!mentorProfile || mentorProfile.approvalStatus !== APPROVAL_STATUS.APPROVED) {
      throw new Error("Mentor profile not approved yet");
    }
    targetRole = "mentor";
  } else {
    targetRole = "learner";
  }

  user.role = targetRole;
  user.activeRole = targetRole;

  await user.save();
  return user;
};
