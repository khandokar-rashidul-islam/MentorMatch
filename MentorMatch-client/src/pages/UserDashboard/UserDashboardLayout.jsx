import Unavbar from "./Unavbar";
import Ufooter from "./Ufooter";
import { Navigate, Outlet } from "react-router";
import { useBootstrapAuth } from "../../hooks/useBootstrapAuth";

const UserDashboard = () => {

  const { user, isLoading } = useBootstrapAuth();

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

  return (
    <>
      <div>
        <Unavbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div> <Ufooter /> </div>
    </>
  );
};

export default UserDashboard;
