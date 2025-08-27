import { Request, Response } from "express";
import * as userService from "./user.service";
import { RegisterData } from "./user.interface";
import config from "../../config";


//*user registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const registrationData = req.body as RegisterData;
    const result = await userService.registerUser(registrationData);

    // Set access token in cookie
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 1 day, same as access token expiry
    });

    // Set refresh token in cookie (same as login)
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });

    res.status(201).json({
      success: true,
      message: "User registered and logged in successfully",
      user: result.user,
      accessToken: result.accessToken,
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};





//* learner -> apply to become mentor (later)
export const applyMentorController = async (req: Request, res: Response) => {
  try {
    // const userId = req.user._id; // from auth middleware
     const {userId} = req.params; // for auth middleware
    const mentorSpecific = req.body; // { expertiseAreas, bio, experienceYears }

    const mentorProfile = await userService.applyMentorForExistingLearner(
      userId,
      mentorSpecific
    );

    res.status(201).json({
      success: true,
      message: "Mentor application submitted successfully. Pending approval.",
      data: mentorProfile,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to apply as mentor",
    });
  }
};




//*Admin approval for mentor
export const approveMentor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const mentorProfile = await userService.approveMentor(userId);
    const user = await userService.toggleRoleAndActiveRole(userId); // optional immediate switch
    res.status(200).json({ message: "Mentor approved", user, mentorProfile });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res
      .status(400)
      .json({ message: err.message || "Failed to approve mentor" });
  }
};



//*role switch functionalities
export const toggleActiveRoleController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await userService.toggleRoleAndActiveRole(userId);

    res.status(200).json({
      success: true,
      message: `Role and active role switched to ${user.activeRole}`,
      data: user,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to toggle role",
    });
  }
};
