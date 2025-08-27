import { Router } from "express";
import * as userController from "./user.controller";
// add auth & admin middlewares if you have them
// import { requireAuth, requireAdmin } from "../../middlewares/auth";

const router = Router();

// register
router.post("/register", userController.registerUser);

// learner applies to mentor (must be logged-in learner)
router.post(
  "/:userId/mentor/apply",
  /*requireAuth,*/ userController.applyMentorController
);

// admin approves mentor
router.patch(
  "/:userId/mentor/approve",
  /*requireAdmin,*/ userController.approveMentor
);

// user/admin switches active role
router.patch(
  "/:userId/active-role/toggle",
  /*requireAuth,*/ userController.toggleActiveRoleController
);

export default router;
