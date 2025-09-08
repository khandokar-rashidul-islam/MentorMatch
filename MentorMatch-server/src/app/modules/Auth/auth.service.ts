import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { LoginPayload, JwtPayload } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { Response } from "express";
import { USER_ROLES } from "../user/user.constant";
import { LearnerProfileModel } from "../learner/learner.model";
import { MentorProfileModel } from "../mentor/mentor.model";
import { ILearnerProfile } from "../learner/learner.interface";
import { IMentorProfile } from "../mentor/mentor.interface";

//* login user

export const loginUser = async (payload: LoginPayload) => {
  // checking if the user is exist
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Invalid credentials password do not match"
    );
  }

  // --- Fetch active profile (learner or mentor) ---
  let name = "";
  let profileImage: string | undefined;

  if (user.activeRole === USER_ROLES.LEARNER) {
    const learnerProfile = await LearnerProfileModel.findOne({
      user: user._id,
    });
    if (learnerProfile) {
      name = learnerProfile.name;
      profileImage = learnerProfile.profileImage;
    }
  } else if (user.activeRole === USER_ROLES.MENTOR) {
    const mentorProfile = await MentorProfileModel.findOne({ user: user._id });
    if (mentorProfile) {
      name = mentorProfile.name;
      profileImage = mentorProfile.profileImage;
    }
  }

  // Always login with activeRole by default
  const jwtPayload: JwtPayload = {
    userId: user._id.toString(),
    activeRole: user.activeRole,
    role: user.role,
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

  const { _id, role: userRoles, activeRole } = user.toObject();

  // Attach common fields
  const userWithProfile = {
    _id,
    name,
    activeRole,
    role: userRoles,
    profileImage,
  };

  return { user: userWithProfile, accessToken, refreshToken };
};

//* logout user

export const logoutUser = async (res: Response) => {

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // false in dev
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // false in dev
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  return {
    success: true,
    message: "User has been logged out successfully",
  };
};

//* get authenticated user profile

export const getAuthenticatedUser = async (userId: string) => {
  const user = await UserModel.findById(userId);
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
      _id: user._id,
      name: profileData?.name,
      activeRole: user.activeRole,
      role: user.role,
      profileImage: profileData?.profileImage,
    },
  };
};



//* refresh access token

export const refreshToken = async (token: string) => {
  // Step 1: Verify refresh token synchronously
  let decoded;
  try {
    decoded = verifyToken(token, config.jwt_refresh_secret as string);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (err) {
    // Directly throw AppError so globalErrorHandler sees the correct status
    throw new AppError(401, "Refresh token expired or invalid!");
  }

  // Step 2: Async operations (Mongoose queries)
  const user = await UserModel.findById(decoded.userId);
  if (!user) throw new AppError(404, "User not found");
  if (user?.isDeleted) throw new AppError(403, "User deleted!");
  if (user?.status === "blocked") throw new AppError(403, "User blocked!");

  // Step 3: Create new access token
  const jwtPayload = {
    userId: user._id.toString(),
    role: user.role,
    activeRole: user.activeRole,
  };
  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // Step 4: Get user profile
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

