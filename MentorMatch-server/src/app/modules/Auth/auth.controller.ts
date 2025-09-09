import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  getAuthenticatedUser,
  loginUser,
  logoutUser,
  refreshToken,
} from "./auth.service";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AuthRequest } from "../user/user.interface";

//* login user
export const loginController = catchAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUser(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // false in dev
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production", // false in dev
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
       user: user,
        //  accessToken: accessToken,
      },
  });
});

//* logout user
export const logout = catchAsync(async (req, res) => {
  const result = await logoutUser(res);
  return res.status(200).json(result);
});

//* get authenticated user profile
export const getMe = catchAsync(async (req, res) => {
  const authReq = req as AuthRequest;
  // Use authenticated user ID
  const userId = authReq.user?.id;

  if (!userId) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const user = await getAuthenticatedUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Authenticated user fetched successfully",
    data: user,
  });
});

//* refresh access token
export const refreshTokenController = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new AppError(401, "Refresh token missing!");

  const result = await refreshToken(token); // now will throw 401 if expired

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
    path: "/",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token refreshed successfully",
    data: { user: result.user },
  });
});

