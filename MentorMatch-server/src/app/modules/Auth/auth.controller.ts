// src/app/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginUser, refreshToken } from "./auth.service";
import config from "../../config";

export const loginController = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, user } = await loginUser(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: { user, accessToken },
  });
});

export const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken: token } = req.cookies;
    const result = await refreshToken(token);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Access token refreshed successfully",
      data: result,
    });
  }
);
