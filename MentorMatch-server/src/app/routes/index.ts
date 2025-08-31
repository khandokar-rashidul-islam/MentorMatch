import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { learnerRoutes } from "../modules/learner/learner.route";

const router = Router();

const moduleRoutes = [
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
    route:learnerRoutes ,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
