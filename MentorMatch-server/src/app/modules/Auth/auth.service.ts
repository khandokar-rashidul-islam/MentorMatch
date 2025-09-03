import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { LoginPayload, JwtPayload } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { Response } from "express";



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


  const userObject = user.toObject();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password: _password, ...userWithoutPassword } = userObject;
  return { accessToken, refreshToken, user: userWithoutPassword };
};

//* logout user

export const logoutUser = async (res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  return {
    success: true,
    message: "User has been logged out successfully",
  };
};



//* refresh access token

export const refreshToken = async (token: string) => {
  try {
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);

    // checking if the user is exist
    const user = await UserModel.findById(decoded.userId);
    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

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

    return { accessToken: newAccessToken };
  } catch {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }
};
