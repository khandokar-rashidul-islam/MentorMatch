import { Router } from "express";
import{ NextFunction, Request, Response } from "express";
import * as userController from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userRegistrationSchema } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";
// add auth & admin middlewares if you have them
// import { requireAuth, requireAdmin } from "../../middlewares/auth";

const router = Router();

// user registration
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

//* user switches active role
router.patch(
  "/:userId/active-role/toggle",
  /*requireAuth,*/ userController.toggleActiveRole
);


//*----------For admin to approve/reject mentor application-------------------

// admin approves mentor
router.patch(
  "/:userId/mentor/approve",
  /*requireAdmin,*/ userController.approveMentor
);


// admin reject mentor
router.patch(
  "/:userId/mentor/reject",
  /*requireAdmin,*/ userController.rejectMentor
);



export const UserRoutes = router;
