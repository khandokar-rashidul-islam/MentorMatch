import { createBrowserRouter, Navigate } from "react-router";
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
import Orders from "../pages/UserDashboard/Tutor/TutorDashboard/Bookings";
import Bookings from "../pages/UserDashboard/Learner/Bookings";
import Bookmarks from "../pages/UserDashboard/Learner/Bookmarks";
import LearnerProfile from "../pages/UserDashboard/Learner/LearnerProfile";
import EditTutorProfile from "../pages/UserDashboard/Tutor/TutorProfile/EditTutorProfile";
import EditProfile from "../pages/UserDashboard/Learner/EditProfile";
import PublicRoute from "./PublicRoute";
import ApplyForMentor from "../pages/UserDashboard/Learner/ApplyForMentor";
import EditGig from "../pages/tutor gig/EditGig";
import AdminHome from "../admin/admin-pages/AdminHome";
import AdminLogin from "../admin/admin-pages/AdminLogin";
import AdminDashboard from "../admin/admin-pages/AdminDashboard";
import MentorApproval from "@/admin/admin-pages/MentorApproval";
import Chat from "@/Chat/chatHome/Chat";
import Payment from "@/pages/payement/Payment";
import PaymentSucess from "@/pages/payement/PaymentSucess";
import PaymentFailed from "@/pages/payement/PaymentFailed";
import Community from "@/pages/community/Community";

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
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },
      {
        path: "/registration",
        element: (
          <PublicRoute>
            <RegistrationForm />
          </PublicRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: "/tutor/details",
        element: (
          <PublicRoute>
            <TutorDetails />
          </PublicRoute>
        ),
      },
      {
        path: "/tutor/gig/details",
        element: (
          <PublicRoute>
            <GigDetails />
          </PublicRoute>
        ),
      },
      {
        path: "all-gigs",
        element: (
          <PublicRoute>
            <AllGigs />
          </PublicRoute>
        ),
      },
      {
        path: "search-mentor",
        element: (
          <PublicRoute>
            <SearchMentor />
          </PublicRoute>
        ),
      },
    ],
  },

  //* User dashboard routes
  {
    path: "/dashboard",
    element: <UserDashboardLayout />,
    children: [
      //mentor dashboard
      {
        path: "mentor",
        element: <TutorDashboardLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: "overview", element: <Overview /> },
          { path: "bookings", element: <Orders /> },
          { path: "stats", element: <TutorStats /> },
          { path: "create-gigs", element: <CreateGigs /> },
          { path: "my-gigs", element: <MyGigs /> },
          { path: "gig-details/:id", element: <GigDetails /> },
          { path: "gig-details/edit/:gigId", element: <EditGig /> },
          { path: "schedule", element: <Schedule /> },
          { path: "payments-history", element: <PaymentHistory /> },
          { path: "community-posts", element: <CommunityPosts /> },
          { path: "previous-jobs", element: <PreviousJobs /> },
          { path: "wallet", element: <Wallet /> },
          { path: "settings", element: <Settings /> },
          { path: "notification", element: <Notify /> },
          { path: "learner-profile", element: <LearnerProfile /> },
          { path: "mentor-profile", element: <TutorDetails /> },
          { path: "mentor-profile/edit", element: <EditTutorProfile /> },
          { path: "community", element: <Community /> },
        ],
      },
      //learner
      {
        path: "learner",
        element: <LearnerHome />,
        children: [
          { index: true, element: <Navigate to="all-gigs" replace /> },
          { path: "all-gigs", element: <AllGigs /> },
          { path: "stats", element: <TutorStats /> },
          { path: "bookings", element: <Bookings /> },
          { path: "bookmarks", element: <Bookmarks /> },
          { path: "search-mentor", element: <SearchMentor /> },
          { path: "notification", element: <Notify /> },
          { path: "learner-profile", element: <LearnerProfile /> },
          { path: "learner-profile/edit", element: <EditProfile /> },
          { path: "mentor-apply", element: <ApplyForMentor /> },
          { path: "mentor-profile/:id", element: <TutorDetails /> },
          { path: "gig-details/:id", element: <GigDetails /> },
          { path: "payment", element: <Payment /> },
          { path: "payment-success", element: <PaymentSucess /> },
          { path: "payment-failed", element: <PaymentFailed /> },
          { path: "community", element: <Community /> },
        ],
      },

      {
        path: "inbox/:username/:conversationId",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminHome />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "",
        element: <AdminDashboard />,
        children: [
          {
            path: "mentors-approve",
            element: <MentorApproval />,
          },
        ],
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
    ],
  },

  { path: "/*", Component: Error404 },
]);

export default router;
