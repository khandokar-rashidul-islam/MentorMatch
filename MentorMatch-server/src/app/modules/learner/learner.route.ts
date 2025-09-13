import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../user/user.constant";
import * as learnerController from "./learner.controller";

const router = Router();


//* learner applies to mentor (must be logged-in learner)
router.post(
  "/apply-mentor",
  auth(USER_ROLES.LEARNER), // only logged-in learners
  learnerController.applyLearnerToMentor
);

export const learnerRoutes = router;
