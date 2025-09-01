import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { learnerRoutes } from "../modules/learner/learner.route";
import { adminRoutes } from "../modules/admin/admin.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/admins",
    route: adminRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/learners",
    route: learnerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
