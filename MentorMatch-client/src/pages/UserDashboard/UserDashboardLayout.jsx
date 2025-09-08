import Unavbar from "./Unavbar";
import Ufooter from "./Ufooter";
import { Navigate, Outlet, useLocation } from "react-router";
import { useBootstrapAuth } from "../../hooks/useBootstrapAuth";

const UserDashboard = () => {
  const { user, isLoading } = useBootstrapAuth();
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        Loading dashboard...
        <progress className="progress w-56"></progress>
      </div>
    );
  }

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
        <Outlet />
      </div>
      <div>
        {" "}
        <Ufooter />{" "}
      </div>
    </>
  );
};

export default UserDashboard;
