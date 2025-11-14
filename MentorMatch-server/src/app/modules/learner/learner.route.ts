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

// get all mentor wigh query
router.get("/mentor-list", learnerController.getAllMentors);




//*======= Get All Gigs (public, with filters in query)==========

router.get("/gigs", learnerController.getAllGigs);

//  Get gigs of any user (public)
router.get("/user-gigs/:userId", learnerController.getGigsByUserId);





//* ======= learner submit review for a gig ===========
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
  learnerController.toggleHelpful
);



//* ================= mentor reviews management routes ===================

// create mentor review
router.post(
  "/mentor-reviews/:mentorId/reviews",
  auth(USER_ROLES.LEARNER),
  learnerController.createMentorReview
);

// fetch mentor reviews
router.get(
  "/mentor-reviews/:mentorId/reviews",
  learnerController.getReviewsByMentor
);

// toggle helpful count for a mentor review
router.patch(
  "/mentor-reviews/helpful/:reviewId",
  auth(USER_ROLES.LEARNER),
  learnerController.MentorToggleHelpful
);

export const learnerRoutes = router;
