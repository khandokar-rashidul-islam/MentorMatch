import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAppSelector } from '../../../redux/hooks';

const LearnerHome = () => {

  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/signin" replace />;

  if (user.activeRole !== "learner") {
    // Prevent mentors from accessing learner routes
    return <Navigate to="/dashboard/mentor/overview" replace />;
  }

  // Not logged in
  if (!user) return <Navigate to="/signin" replace />;

  // Role check
  if (user.activeRole !== "learner") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Unauthorized: Only learners can access this page</h1>
      </div>
    );
  }

  return (
    <div className=''>
        <Outlet/>
    </div>
  )
}

export default LearnerHome