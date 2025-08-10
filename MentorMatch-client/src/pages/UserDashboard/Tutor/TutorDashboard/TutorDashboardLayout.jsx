import React from "react";
import { Outlet } from "react-router";
import TutorSidebar from "./TutorSidebar";
//import { Card } from "@/components/ui/card";
const TutorDashboardLayout = () => {
  return (
    <div className="flex gap-2 pt-20 min-h-screen ">
      <div className="mb-2">
        <TutorSidebar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default TutorDashboardLayout;
