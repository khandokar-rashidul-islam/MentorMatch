import { Router } from "express";
import{ NextFunction, Request, Response } from "express";
import * as userController from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userRegistrationSchema } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";
import { USER_ROLES } from "./user.constant";
import auth from "../../middlewares/auth";

const router = Router();

//* ---------------- User registration ----------------
router.post(
  "/register",
  upload.single("profileImage"), // optional image
  (req:Request, res:Response, next:NextFunction) => {
    if (req.body.data) req.body = JSON.parse(req.body.data); // parse JSON
    if (req.file) req.body.profileImageFile = req.file; // pass buffer
    next();
  },
  validateRequest(userRegistrationSchema),
  userController.registerUser
);

//* ---------------- Toggle active role (learner <-> mentor) ----------------
router.patch(
  "/active-role/toggle",
  auth(USER_ROLES.LEARNER, USER_ROLES.MENTOR), // must be logged in
  userController.toggleActiveRole
);



//* ---------------- Admin approves/rejects mentor ----------------
router.patch(
  "/mentor/:mentorUserId/approve",
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), // only admins
  userController.approveMentor
);


router.patch(
  "/mentor/:mentorUserId/reject",
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), // only admins
  userController.rejectMentor
);



//*---------- Get active role profile---------------------
router.get(
  "/profile",
  auth(USER_ROLES.LEARNER, USER_ROLES.MENTOR), // must be logged in
  userController.getProfile
);

export const UserRoutes = router;
