/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { UserModel } from "../modules/user/user.model";
import { AdminModel } from "../modules/admin/admin.model";
import {
  AuthRequest,
  AuthUserPayload,
} from "../modules/user/user.interface";
import { TUserRole, USER_ROLES } from "../modules/user/user.constant";

// Middleware to protect routes based on roles
const auth = (...requiredRoles: TUserRole[]) =>
  catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload & { userId?: string; activeRole: string; role: string[] };
    const { userId, activeRole } = decoded;

    // Determine admin or normal user
    let user: any;
    if (
      activeRole === USER_ROLES.ADMIN ||
      activeRole === USER_ROLES.SUPER_ADMIN
    ) {
      user = await AdminModel.findById(userId);
      if (!user) throw new AppError(httpStatus.NOT_FOUND, "Admin not found!");
      if (user.isLocked)
        throw new AppError(httpStatus.FORBIDDEN, "Admin account is locked!");
    } else {
      user = await UserModel.findById(userId);
      if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found!");
      if (user.isDeleted)
        throw new AppError(httpStatus.FORBIDDEN, "User is deleted!");
      if (user.status === "blocked")
        throw new AppError(httpStatus.FORBIDDEN, "User is blocked!");
    }

    // Map to AuthUserPayload for type-safety
    const authUser: AuthUserPayload = {
      id: user._id.toString(),
      activeRole: activeRole,
      role: user.role as TUserRole[],
      email: user.email,
      name: user.name,
    };

    // 4. Super-admin bypass
    if (user.role.includes(USER_ROLES.SUPER_ADMIN)) {
      req.user = authUser;
      return next();
    }

    // 5. Admin routes
    if (requiredRoles.includes(USER_ROLES.ADMIN as any)) {
      if (!user.role.includes(USER_ROLES.ADMIN)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Admin access required");
      }
      req.user = authUser;
      return next();
    }

    // 6. Learner/Mentor routes
    if (
      requiredRoles.includes(activeRole as any) &&
      user.role.includes(activeRole)
    ) {
      if (activeRole === USER_ROLES.MENTOR) {
        const mentorProfile = await (
          await import("../modules/mentor/mentor.model")
        ).MentorProfileModel.findOne({ user: userId });
        if (!mentorProfile)
          throw new AppError(httpStatus.FORBIDDEN, "Mentor profile not found");
        if (mentorProfile.approvalStatus !== "approved") {
          throw new AppError(httpStatus.FORBIDDEN, "Mentor not approved yet");
        }
      }

      req.user = authUser;
      return next();
    }

    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized for this route!"
    );
  });

export default auth;
