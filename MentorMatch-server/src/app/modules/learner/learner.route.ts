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

//* get mentor public profile by id (for learner to view)
router.get(
  "/mentor-details/:mentorId",
  learnerController.getMentorById
);

//* Get All Gigs (public, with filters in query)
router.get("/gigs", learnerController.getAllGigs);


//* learner submit review for a gig
router.post(
  "/reviews/:gigId",
  auth(USER_ROLES.LEARNER), // only logged-in learners
  learnerController.createReview
);
// Get all reviews for a specific gig
router.get(
  "/reviews/:gigId",
  learnerController.getReviewsByGig
);

//toggle helpful count for a review
router.patch(
  "/reviews/helpful/:reviewId",
  auth(USER_ROLES.LEARNER), // only logged-in learners
  learnerController.incrementHelpful
);



export const learnerRoutes = router;
