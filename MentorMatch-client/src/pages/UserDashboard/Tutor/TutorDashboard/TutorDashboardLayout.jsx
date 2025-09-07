import React, { useState } from "react";
import { Navigate, Outlet } from "react-router";
import TutorSidebar from "./TutorSidebar";
import { useAppSelector } from "../../../../redux/hooks";

const TutorDashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

   const user = useAppSelector((state) => state.auth.user);

   if (!user) return <Navigate to="/signin" replace />;

   if (user.activeRole !== "mentor") {
     // Prevent learners from accessing mentor routes
     return <Navigate to="/dashboard/learner/all-gigs" replace />;
   }
   
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
