import { createBrowserRouter } from "react-router";
import Error404 from "../pages/Error404";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home/Home";
import RegistrationForm from "../pages/Registration/RegistrationForm";
import SignIn from "../pages/Login/SignIn";
import TutorDetails from "../pages/Tutor/TutorDetails";
import GigDetails from "../pages/tutor gig/GigDetails";
import UserDashboardLayout from "../pages/UserDashboard/UserDashboardLayout";
import AllGigs from "../pages/All gigs/AllGigs";
import TutorDashboardLayout from "../pages/UserDashboard/Tutor/TutorDashboard/TutorDashboardLayout";
import TutorStats from "../pages/UserDashboard/Tutor/TutorDashboard/TutorStats";
import LearnerHome from "../pages/UserDashboard/Learner/LearnerHome";
import LearnerStats from "../pages/UserDashboard/Learner/LearnerStats";
import Overview from "../pages/UserDashboard/Tutor/TutorDashboard/Overview";
import CreateGigs from "../pages/UserDashboard/Tutor/TutorDashboard/CreateGigs";
import MyGigs from "../pages/UserDashboard/Tutor/TutorDashboard/MyGigs";
import Schedule from "../pages/UserDashboard/Tutor/TutorDashboard/Schedule";
import PaymentHistory from "../pages/UserDashboard/Tutor/TutorDashboard/PaymentHistory";
import CommunityPosts from "../pages/UserDashboard/Tutor/TutorDashboard/CommunityPosts";
import PreviousJobs from "../pages/UserDashboard/Tutor/TutorDashboard/PreviousJobs";
import Settings from "../pages/UserDashboard/Tutor/TutorDashboard/Settings";
import Wallet from "../pages/UserDashboard/Tutor/TutorDashboard/Wallet";
import SearchMentor from "../pages/Mentor Find/SearchMentor";
import Notify from "../pages/Notification/Notify";

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
        path: "all-gigs",
        element: <AllGigs />,
      },
      {
        path: 'search-mentor',
        element: <SearchMentor />
      },

    ],
  },

  //Dashboard
  {
    path: "/dashboard",
    element: <UserDashboardLayout />,
    children: [
      //tutor dashboard
      {
        path: "mentor",
        element: <TutorDashboardLayout />,
        children: [
          {
            path: "overview",
            element: <Overview />,
          },
          {
            path: "stats",
            element: <TutorStats />,
          },
          {
            path: "create-gigs",
            element: <CreateGigs />
          },
          {
            path: "my-gigs",
            element: <MyGigs />
          },
          {
            path: "schedule",
            element: <Schedule />
          },
          {
            path: "payments-history",
            element: <PaymentHistory />
          },
          {
            path: "community-posts",
            element: <CommunityPosts />

          },
          {
            path: "Previous-jobs",
            element: <PreviousJobs />
          },
          {
            path: "wallet",
            element: <Wallet />
          },
          {
            path: "settings",
            element: <Settings />
          },
          {
            path: 'notification',
            element: <Notify />
          }

        ],
      },
      //learner
      {
        path: "learner",
        element: <LearnerHome />,
        children: [
          {
            index: true,
            element: <AllGigs />,
          },
          {
            path: "stats",
            element: <LearnerStats />,
          },
        ],
      },
    ],
  },

  {
    path: "/*",
    Component: Error404,
  },
]);

export default router;
