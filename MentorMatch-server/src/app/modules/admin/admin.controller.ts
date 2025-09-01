import * as adminService from "./admin.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// Create a new admin (only super-admin can call this)
export const registerAdmin = catchAsync(async (req, res) => {
  const adminData = req.body; // { name, email, password, role }
  const result = await adminService.createAdmin(adminData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

// Admin login
export const loginAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await adminService.loginAdmin(email, password);

  // Set cookies
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 15, // 15 minutes
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin logged in successfully!",
    data: { admin: result.admin, accessToken: result.accessToken },
  });
});
