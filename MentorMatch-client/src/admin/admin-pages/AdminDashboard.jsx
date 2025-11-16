import React from "react";
import { Topbar } from "../admin-components/Topbar";
import { Sidebar } from "../admin-components/Sidebar";
import { Outlet } from "react-router";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
