import React, { useState } from "react";
import { Outlet } from "react-router";
import TutorSidebar from "./TutorSidebar";
//import { Card } from "@/components/ui/card";
const TutorDashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="relative flex gap-2 justify-between  mb-4 min-h-screen w-full">
      <div className="mb-4 absolute z-10">
        <TutorSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className={`${
        collapsed ? "pl-16" : "sm:pl-55"
      } w-full`}>
        <Outlet />
      </div>
    </div>
  );
};

export default TutorDashboardLayout;
