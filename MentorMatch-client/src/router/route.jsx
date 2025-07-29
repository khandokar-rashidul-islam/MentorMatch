import { createBrowserRouter } from "react-router";
import Error404 from "../pages/Error404";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home/Home";
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

    ],
  },

  {
    path: "/*",
    Component: Error404,
  },
]);

export default router;
