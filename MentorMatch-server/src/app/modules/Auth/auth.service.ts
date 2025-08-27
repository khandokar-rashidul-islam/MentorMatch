import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { LoginPayload, JwtPayload } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";

export const loginUser = async (payload: LoginPayload) => {
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // Always login with activeRole = learner by default
  const jwtPayload: JwtPayload = {
    userId: user._id.toString(),
    role: user.role,
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

  return { accessToken, refreshToken, user };
};

export const refreshToken = async (token: string) => {
  try {
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);

    const user = await UserModel.findById(decoded.userId);
    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

    const jwtPayload: JwtPayload = {
      userId: user._id.toString(),
      role: user.role,
      activeRole: user.activeRole,
    };

    const newAccessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );

    return { accessToken: newAccessToken };
  } catch {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }
};
