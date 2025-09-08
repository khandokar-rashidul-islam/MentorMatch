import { Navigate } from "react-router";
import { useAppSelector } from "../redux/hooks";

const PublicRoute = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (user) {
    // redirect logged-in user to dashboard (role-based)
    return user.role === "mentor" ? (
      <Navigate to="/dashboard/mentor/overview" replace />
    ) : (
      <Navigate to="/dashboard/learner/all-gigs" replace />
    );
  }

  return children;
};

export default PublicRoute;
