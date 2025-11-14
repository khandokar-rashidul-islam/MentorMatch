import Unavbar from "./Unavbar";
import Ufooter from "./Ufooter";
import { Navigate, Outlet, useLocation } from "react-router";
import { useBootstrapAuth } from "../../hooks/useBootstrapAuth";
import ScrollToTop from "../../router/ScrollToTop";

const UserDashboard = () => {
  const { user } = useBootstrapAuth();

  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Redirect /dashboard or /dashboard/ to role-based default route

  if (/^\/dashboard\/?$/.test(location.pathname)) {
    return user.role === "mentor" ? (
      <Navigate to="/dashboard/mentor/overview" replace />
    ) : (
      <Navigate to="/dashboard/learner/all-gigs" replace />
    );
  }

  return (
    <>
      <div>
        <Unavbar />
      </div>
      <div>
        <ScrollToTop/>
        <Outlet />
      </div>
      <div>
        <Ufooter />
      </div>
    </>
  );
};

export default UserDashboard;
