import React from "react";
import Unavbar from "./Unavbar";
import Ufooter from "./Ufooter";
import { Outlet } from "react-router";

const UserDashboard = () => {
  return (
    <div className="">
      <div className="">
        <Unavbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Ufooter />
      </div>
    </div>
  );
};

export default UserDashboard;
