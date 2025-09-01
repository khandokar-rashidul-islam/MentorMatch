import express from "express";
import { registerAdmin, loginAdmin } from "./admin.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../user/user.constant";


const router = express.Router();

// Admin login route
router.post("/login", loginAdmin);

// Create admin (super-admin only)
router.post("/create",auth(USER_ROLES.SUPER_ADMIN) ,registerAdmin);

export const adminRoutes = router;
