import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col ">
      <div className="">
        <Navbar />
      </div>
      <div className="min-h-screen ">
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
