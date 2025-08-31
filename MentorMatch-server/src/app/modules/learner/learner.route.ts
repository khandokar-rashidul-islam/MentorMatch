import * as learnerController from "./learner.controller";
import { Router } from "express";

const router = Router();

//* learner applies to mentor (must be logged-in learner)
router.post(
  "/:userId/mentor/apply",
  /*requireAuth,*/ learnerController.applyLearnerToMentor
);

export const learnerRoutes = router;
