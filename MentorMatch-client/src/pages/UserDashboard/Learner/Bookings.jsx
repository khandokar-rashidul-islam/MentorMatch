import { Card } from "@/components/ui/card";
import { useGetLearnerOrdersQuery } from "@/redux/features/bookings/payment.api";
import React from "react";
import { Link, useNavigate } from "react-router"; // Use useNavigate

const Bookings = () => {
  const { data, isLoading, isError } = useGetLearnerOrdersQuery();
  const navigate = useNavigate(); // Hook for navigation
  const orders = data?.data || [];

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const h = minutes / 60;
      return `${h} hour${h > 1 ? "s" : ""}`;
    }
    return `${minutes} minutes`;
  };

  const isCurrentSession = (session) => {
    if (!session) return false;
    const start = new Date(session.startTime);
    const now = new Date();
    // Allow join 15 mins before until end time
    const diffMins = (start - now) / 60000;
    return (
      diffMins <= 15 &&
      session.status !== "completed" &&
      session.status !== "cancelled"
    );
  };

  if (isLoading) return <div className="pt-24 w-11/12 mx-auto">Loading...</div>;
  if (isError)
    return (
      <div className="pt-24 w-11/12 mx-auto text-red-500">
        Error loading bookings
      </div>
    );

  return (
    <div className="min-h-screen pt-24 w-11/12 mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-10">My Bookings</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => {
          const mentorUser = order.mentor; // This is the User object now
          const mentorProfile = mentorUser?.mentorProfile; // Nested profile from populate
          const gig = order.gig;
          const session = order.session; // Virtual populated

          const start = new Date(order.startDate).toLocaleDateString("en-GB");
          const durationText = formatDuration(order.durationPerSessionMinutes);
          const statusUI =
            order.paymentStatus === "success"
              ? "Paid"
              : order.paymentStatus === "pending"
              ? "Pending"
              : "Canceled";

          const canJoin =
            isCurrentSession(session) && order.paymentStatus === "success";

          return (
            <Card
              key={order._id}
              className="flex flex-col justify-between border rounded-xl p-5 shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">{gig?.gigTitle}</h2>
                <span className="text-xs font-bold px-2 py-1 text-green-600 ">
                  {statusUI}
                </span>
              </div>

              {/* Mentor Info */}
              <div className="flex items-center gap-2 mt-3">
                <img
                  src={mentorProfile?.profileImage || "https://placehold.co/50"}
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm">{mentorProfile?.name || "Mentor"}</p>
              </div>

              <div className="my-4 border-t" />

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Start:</span> <span>{start}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span> <span>{durationText}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() =>
                    session && navigate(`/meeting/${session.meetingId}`)
                  }
                  disabled={!canJoin}
                  className={`flex-1 py-2 rounded-lg font-medium text-white transition
                     ${
                       canJoin
                         ? "bg-primary hover:bg-primary/90"
                         : "bg-gray-300 cursor-not-allowed"
                     }
                   `}
                >
                  {canJoin
                    ? "Join Session"
                    : session
                    ? "Wait for time"
                    : "Processing"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Bookings;
