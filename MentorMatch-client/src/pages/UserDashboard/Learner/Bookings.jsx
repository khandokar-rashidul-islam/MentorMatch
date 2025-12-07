import { useGetLearnerOrdersQuery } from "@/redux/features/bookings/payment.api";
import React from "react";
import { Link } from "react-router";


const Bookings = () => {
  const { data, isLoading, isError } = useGetLearnerOrdersQuery();
  const orders = data?.data || [];

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const h = minutes / 60;
      return `${h} hour${h > 1 ? "s" : ""}`;
    }
    return `${minutes} minutes`;
  };

  const isCurrentSession = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();

    const diff = Math.abs(start.getTime() - now.getTime()) / (1000 * 60);
    return diff <= 30;
  };

  if (isLoading) {
    return (
      <div className="pt-24 w-11/12 mx-auto">
        <h1 className="text-3xl font-bold mb-10">My Bookings</h1>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pt-24 w-11/12 mx-auto">
        <h1 className="text-3xl font-bold mb-10">My Bookings</h1>
        <p className="text-red-500">Failed to load bookings.</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="pt-24 w-11/12 mx-auto text-center">
        <h1 className="text-3xl font-bold mb-10">My Bookings</h1>
        <p>No bookings found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 w-11/12 mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-10">My Bookings</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => {
          const mentor = order.mentor;
          const gig = order.gig;

          const start = new Date(order.startDate).toLocaleDateString("en-GB");
          const durationText = formatDuration(order.durationPerSessionMinutes);

          // Convert backend "success" → UI "Paid"
          const statusUI =
            order.paymentStatus === "success"
              ? "Paid"
              : order.paymentStatus === "pending"
              ? "Pending"
              : "Canceled";

          return (
            <div
              key={order._id}
              className="flex flex-col justify-between bg-white dark:bg-primary/5
              border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm"
            >
              {/* Top: Gig Title */}
              <div className="flex items-start justify-between">
                <Link to={`/dashboard/learner/gig-details/${gig?._id}`}>
                  <h2 className="text-xl hover:text-primary cursor-pointer font-semibold leading-snug">
                    {gig?.gigTitle}
                  </h2>
                </Link>

                <span
                  className={`
                    px-2 py-1 text-xs rounded-md font-semibold
                    ${
                      statusUI === "Paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-600/20 dark:text-green-300"
                        : statusUI === "Canceled"
                        ? "bg-red-100 text-red-700 dark:bg-red-600/20 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-600/20 dark:text-yellow-300"
                    }
                  `}
                >
                  {statusUI}
                </span>
              </div>

              {/* Mentor */}
              {mentor ? (
                <Link
                  to={`/dashboard/learner/mentor-profile/${mentor?._id}`}
                  className="flex items-center gap-2 mt-3 cursor-pointer hover:text-primary"
                >
                  <img
                    src={
                      mentor?.profileImage || "https://i.pravatar.cc/150?img=1"
                    }
                    className="w-10 h-10 rounded-full object-cover border dark:border-gray-600"
                  />
                  <p className="text-sm">{mentor?.name}</p>
                </Link>
              ) : (
                <p className="mt-3 text-sm text-gray-500">
                  Mentor Not Assigned
                </p>
              )}

              <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

              {/* Booking Info */}
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span className="font-medium">Start Date</span>
                  <span>{start}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Duration</span>
                  <span>{durationText}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Total Sessions</span>
                  <span>{order.durationSessions}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Price</span>
                  <span>
                    {order.price} {order.currency}
                  </span>
                </div>
              </div>

              {/* Session Warning */}
              {isCurrentSession(order.startDate) && statusUI !== "Canceled" && (
                <p className="mt-3 text-sm font-medium text-amber-600 dark:text-amber-400">
                  ⚠️ Your first session may start within the next 30 minutes.
                </p>
              )}

              {/* Buttons */}
              {statusUI !== "Canceled" && (
                <div className="mt-5 flex gap-3">
                  <button
                    className={`
                      flex-1 px-4 py-2 rounded-lg text-white font-medium transition
                      ${
                        isCurrentSession(order.startDate)
                          ? "bg-primary"
                          : statusUI === "Pending"
                          ? "bg-amber-400/50 hover:bg-amber-500"
                          : "bg-primary/50 hover:bg-primary"
                      }
                    `}
                  >
                    {isCurrentSession(order.startDate)
                      ? "Join Now"
                      : statusUI === "Pending"
                      ? "Pay Now"
                      : "Join"}
                  </button>

                  <button
                    className="
                      flex-1 px-4 py-2 rounded-lg 
                      border border-gray-300 dark:border-gray-600 
                      text-gray-700 dark:text-gray-300 font-medium
                      hover:bg-gray-100 dark:hover:bg-gray-800/30
                      transition
                    "
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookings;
