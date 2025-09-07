import express from "express";
import { getMe, loginController, logout, refreshTokenController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  loginValidationSchema,
} from "./auth.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

// login user
router.post("/login", validateRequest(loginValidationSchema), loginController);

// logout user
router.post("/logout", logout);


// refresh access token
router.post("/refresh-token", refreshTokenController);

// get authenticated user profile
router.get("/me", auth(), getMe);

export const AuthRoutes = router;
