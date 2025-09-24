import { Router } from "express";
import {
  createGig,
  updateGig,
  deleteGig,
  getGigById,
  getAllGigs,
  getMyGigs,
} from "./mentor.controller";
import { createGigSchema, updateGigSchema } from "./mentor.validation";
import { USER_ROLES } from "../user/user.constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

//* Create Gig (only mentors)
router.post(
  "/gig-create",
  auth(USER_ROLES.MENTOR),
  validateRequest(createGigSchema),
  createGig
);

//* Update Gig (only mentors who own the gig)
router.patch(
  "/gig-edit/:id",
  auth(USER_ROLES.MENTOR),
  validateRequest(updateGigSchema),
  updateGig
);

//* Delete Gig (only mentors who own the gig)
router.delete("/gig-delete/:id", auth(USER_ROLES.MENTOR), deleteGig);

//* Get Single Gig (public)
router.get("/gig-details/:id", getGigById);

//* Get All Gigs (public, with filters in query)
router.get("/gigs", getAllGigs);

//* Get My Gigs (only mentors)
router.get("/my-gigs", auth(USER_ROLES.MENTOR), getMyGigs);

export const mentorRoutes = router;