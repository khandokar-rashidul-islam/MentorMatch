import React from "react";
import Unavbar from "./Unavbar";
import Ufooter from "./Ufooter";
import { Outlet } from "react-router";

const UserDashboard = () => {
  return (
    <>
      <Unavbar />
      <Outlet />
      <Ufooter />
    </>
  );
};

export default UserDashboard;
