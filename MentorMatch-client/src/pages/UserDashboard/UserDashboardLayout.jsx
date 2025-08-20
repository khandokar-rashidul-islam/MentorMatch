import { useContext } from "react";
import Unavbar from "./Unavbar";
import Ufooter from "./Ufooter";
import { Outlet } from "react-router";
import { RoleContext } from "../../context/RoleContext";

const UserDashboard = () => {
  const { role } = useContext(RoleContext);
  return (
    <>
      <div>
        <Unavbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>{role !== "mentor" && <Ufooter />}</div>
    </>
  );
};

export default UserDashboard;
