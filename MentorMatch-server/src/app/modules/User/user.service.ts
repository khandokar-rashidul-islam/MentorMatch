import mongoose, { Types, ClientSession } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { UserModel } from "./user.model";
import { USER_ROLES, APPROVAL_STATUS, USER_STATUS } from "./user.constant";
import { IUser, RegisterData } from "./user.interface";
import { LearnerProfileModel } from "../learner/learner.model";
import { MentorProfileModel } from "../mentor/mentor.model";
import { ILearnerProfile } from "../learner/learner.interface";
import { IMentorProfile } from "../mentor/mentor.interface";
import { JwtPayload } from "../auth/auth.interface";
import { createToken } from "../auth/auth.utils";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { v2 as cloudinary } from "cloudinary";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
//import AppError from "../../errors/AppError";

// -- helpers --
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
  profileImage: mentorProfile.profileImage,
  name: mentorProfile.name,
  phone: mentorProfile.phone,
  birthDate: mentorProfile.birthDate,
  gender: mentorProfile.gender,
  address: mentorProfile.address,
  education: mentorProfile.education,
  educationInstitute: mentorProfile.educationInstitute,
  profession: mentorProfile.profession,
  nidOrBirthCertId: mentorProfile.nidOrBirthCertId,
  bankAccountNo: mentorProfile.bankAccountNo,
});

//* -------------------- Register and login User --------------------

export const registerUser = async (data: RegisterData) => {
  const { user, learnerProfile, mentorProfile, profileImageFile } = data;
  const session = await mongoose.startSession();
  let profileImageUrl: string | undefined;
  let uploadedImage: { secure_url: string; public_id: string } | null = null;

  try {
    session.startTransaction();

    // 1) Validate optional image before registration
    if (profileImageFile) {
      uploadedImage = await sendImageToCloudinary(
        `user-${user.email}-${Date.now()}`,
        profileImageFile.buffer
      );
      profileImageUrl = uploadedImage.secure_url as string;
    }

    // 2) Hash password
    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );

    // 3) Build roles array
    const role: IUser["role"] = [USER_ROLES.LEARNER];
    // If user selected mentor, add "mentor" to roles array
    if (data.role.includes(USER_ROLES.MENTOR)) {
      role.push(USER_ROLES.MENTOR);
    }

    // 4) Create user

    const [createdUser] = await UserModel.create(
      [
        {
          email: user.email,
          password: hashedPassword,
          role,
          activeRole: USER_ROLES.LEARNER,
          status: USER_STATUS.IN_PROGRESS,
          isDeleted: false,
        },
      ],
      { session }
    );

    // --- Common fields (name + image) ---
    let commonName = "";
    let commonProfileImage = profileImageUrl;

    // Attach profile image to profile data if exists
    if (role.includes(USER_ROLES.LEARNER) && learnerProfile) {
      if (profileImageUrl) learnerProfile.profileImage = profileImageUrl;
      await createLearnerProfile(createdUser._id, learnerProfile, session);
      commonName = learnerProfile.name;
      commonProfileImage = learnerProfile.profileImage;
    } else if (role.includes(USER_ROLES.MENTOR)) {
      if (!mentorProfile) throw new Error("Mentor profile required");
      if (profileImageUrl) mentorProfile.profileImage = profileImageUrl;
      await createMentorProfile(
        createdUser._id,
        mentorProfile,
        session,
        APPROVAL_STATUS.PENDING
      );

      // Fallback learner profile from mentor
      const fallbackLearner = mapCommonFromMentor(mentorProfile);
      await createLearnerProfile(createdUser._id, fallbackLearner, session);

      commonName = mentorProfile.name;
      commonProfileImage = mentorProfile.profileImage;
    }

    // Commit transaction
    await session.commitTransaction();

    // --- Auto-login: create JWT tokens ---
    const jwtPayload: JwtPayload = {
      userId: createdUser._id.toString(),
      activeRole: USER_ROLES.LEARNER,
      role: createdUser.role,
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

    const { _id, role: userRoles, activeRole } = createdUser.toObject();

    // Attach common fields (name + image)
    const userWithProfile = {
      _id,
      name: commonName,
      activeRole,
      userRoles,
      profileImage: commonProfileImage,
    };

    return { user: userWithProfile, accessToken, refreshToken };
  } catch (err) {
    await session.abortTransaction();

    // Delete uploaded Cloudinary image if transaction fails
    if (uploadedImage?.public_id) {
      await cloudinary.uploader.destroy(uploadedImage.public_id);
    }

    throw err; // Global error handler will catch this
  } finally {
    session.endSession();
  }
};

//* -------------------- Admin approves mentor application --------------------
export const approveMentorApplication = async (mentorUserId: string) => {
  const mentor = await MentorProfileModel.findOne({ user: mentorUserId });
  if (!mentor) throw new Error("Mentor not found");

  // Prevent re-approving an already approved mentor
  if (mentor.approvalStatus === APPROVAL_STATUS.APPROVED) {
    throw new Error("Mentor is already approved");
  }

  mentor.approvalStatus = APPROVAL_STATUS.APPROVED;
  await mentor.save();

  // Ensure role updated in User collection
  await UserModel.findByIdAndUpdate(
    mentorUserId,
    { $addToSet: { role: USER_ROLES.MENTOR } },
    { new: true }
  );

  return mentor;
};

// -------------------- Admin rejects mentor application --------------------
export const rejectMentorApplication = async (mentorUserId: string) => {
  const mentor = await MentorProfileModel.findOne({ user: mentorUserId });
  if (!mentor) throw new Error("Mentor not found");

  // Prevent rejecting an already approved mentor
  if (mentor.approvalStatus === APPROVAL_STATUS.APPROVED) {
    throw new Error("Cannot reject an already approved mentor");
  }

  mentor.approvalStatus = APPROVAL_STATUS.REJECTED;
  await mentor.save();

  return mentor;
};
//* -------------------- Toggle Active Role (learner <-> mentor) --------------------
export const toggleActiveRole = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  // Determine target role
  const targetRole: "learner" | "mentor" =
    user.activeRole === USER_ROLES.LEARNER
      ? USER_ROLES.MENTOR
      : USER_ROLES.LEARNER;

  // Only allow switching to mentor if user has mentor role and is approved
  if (targetRole === USER_ROLES.MENTOR) {
    if (!user.role.includes(USER_ROLES.MENTOR)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "User does not have mentor role is not approved yet"
      );
    }

    const mentorProfile = await MentorProfileModel.findOne({ user: userId });
    if (!mentorProfile)
      throw new AppError(httpStatus.NOT_FOUND, "Mentor profile not found");

    if (mentorProfile.approvalStatus === APPROVAL_STATUS.PENDING) {
      throw new AppError(httpStatus.FORBIDDEN, "Mentor not approved yet");
    }

    if (mentorProfile.approvalStatus === APPROVAL_STATUS.REJECTED) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Mentor application was rejected"
      );
    }
  }

  // Update active role
  user.activeRole = targetRole;
  await user.save();

  // Optionally, create a new access token reflecting updated activeRole
  const jwtPayload: JwtPayload = {
    userId: user._id.toString(),
    activeRole: user.activeRole,
    role: user.role,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // active role profile data
  let name = "",
    profileImage: string | undefined;
  if (user.activeRole === USER_ROLES.LEARNER) {
    const profile = await LearnerProfileModel.findOne({ user: user._id });
    if (profile) {
      name = profile.name;
      profileImage = profile.profileImage;
    }
  } else if (user.activeRole === USER_ROLES.MENTOR) {
    const profile = await MentorProfileModel.findOne({ user: user._id });
    if (profile) {
      name = profile.name;
      profileImage = profile.profileImage;
    }
  }

  return {
    accessToken: newAccessToken,
    user: {
      _id: user._id,
      name,
      activeRole: user.activeRole,
      role: user.role,
      profileImage,
    },
  };
};

// * -------------------- Get user profile based on active role --------------------
export const getProfile = async (userId: string) => {
  const user: IUser | null = await UserModel.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  let profileData: ILearnerProfile | IMentorProfile;

  if (user.activeRole === USER_ROLES.LEARNER) {
    const learnerProfile = await LearnerProfileModel.findOne({
      user: user._id,
    }).lean();
    if (!learnerProfile)
      throw new AppError(httpStatus.NOT_FOUND, "Learner profile not found");
    profileData = learnerProfile;
  } else if (user.activeRole === USER_ROLES.MENTOR) {
    const mentorProfile = await MentorProfileModel.findOne({
      user: user._id,
    }).lean();
    if (!mentorProfile)
      throw new AppError(httpStatus.NOT_FOUND, "Mentor profile not found");
    profileData = mentorProfile;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid active role");
  }

  return {
    user: {
      name: profileData.name,
      profileImage: profileData.profileImage,
      activeRole: user.activeRole,
      profile: profileData, // full active role profile
    },
  };
};
