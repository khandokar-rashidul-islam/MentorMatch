import { createBrowserRouter } from "react-router";
import Error404 from "../pages/Error404";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home/Home";
import RegistrationForm from "../pages/Registration/RegistrationForm";
import SignIn from "../pages/Login/SignIn";
import TutorDetails from "../pages/Tutor/TutorDetails";

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
        element: <SignIn/>
      },
      {
        path:"/tutor/details",
        element:<TutorDetails/>
      }
    ],
  },

  {
    path: "/*",
    Component: Error404,
  },
]);

export default router;
