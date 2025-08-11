import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import ScrollToTop from "../router/ScrollToTop";

const AppLayout = () => {
  return (
    <div className="flex flex-col ">
      <div className="">
        <Navbar />
      </div>
      <div className="min-h-screen ">
        <ScrollToTop/>
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
