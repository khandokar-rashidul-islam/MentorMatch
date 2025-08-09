import { createBrowserRouter } from "react-router";
import Error404 from "../pages/Error404";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home/Home";
import RegistrationForm from "../pages/Registration/RegistrationForm";
import SignIn from "../pages/Login/SignIn";
import TutorDetails from "../pages/Tutor/TutorDetails";
import GigDetails from "../pages/tutor gig/GigDetails";
import UserDashboardLayout from "../pages/UserDashboard/UserDashboardLayout";
import UserDashboardHome from "../pages/UserDashboard/UserDashboardHome";
import LearnerProfile from "../pages/UserDashboard/Learner/LearnerProfile";
import TutorProfile from "../pages/UserDashboard/Tutor/TutorProfile";
import AllGigs from "../pages/All gigs/AllGigs";



const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    hydrateFallbackElement: (
      <div className="min-h-screen flex justify-center items-center flex-col">
        Wait...
        <progress className="progress w-56"></progress>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/registration",
        element: <RegistrationForm />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/tutor/details",
        element: <TutorDetails />,
      },
      {
        path: "/tutor/gig/details",
        element: <GigDetails />,
      },
      {
        path:"all-gigs",
        element:<AllGigs/>
      }
    ],
  },

  //Dashboard
  {
    path: "/dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        index: true,
        element: <UserDashboardHome />,
      },
      {
        path: "/dashboard/learner-profile",
        element: <LearnerProfile />,
      },




      {
        path: "/dashboard/tutor-profile",
        element:<TutorProfile/>
      },




    ],
  },

  {
    path: "/*",
    Component: Error404,
  },
]);

export default router;
