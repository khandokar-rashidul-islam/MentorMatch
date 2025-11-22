import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { learnerRoutes } from "../modules/learner/learner.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { mentorRoutes } from "../modules/mentor/mentor.route";
import { ChatRoutes } from "../modules/chat/chat.route";


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
  {
    path: "/mentors",
    route: mentorRoutes,
  },
  {
    path: "/chat",
    route: ChatRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
