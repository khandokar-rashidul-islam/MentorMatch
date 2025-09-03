import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginUser, logoutUser, refreshToken } from "./auth.service";
import config from "../../config";

//* login user
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

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: { user, accessToken },
  });

});



//* logout user 
export const logout = catchAsync(async (req, res) => {
  const result = await logoutUser(res);
  return res.status(200).json(result);
});




//* refresh access token
export const refreshTokenController = catchAsync(
  async (req, res) => {
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
