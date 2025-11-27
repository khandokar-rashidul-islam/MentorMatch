import React from "react";
import { Link } from "react-router";

const dummyBookings = [
  {
    id: 1,
    gigId: "68d0478b1212d77cda75d49d",
    mentorId: "68cb1ad4590a54916cbb91b2",
    gigTitle: "Master JavaScript Fundamentals",
    mentorName: "John Carter",
    mentorImg: "https://i.pravatar.cc/150?img=1",
    date: "2025-11-27",
    time: "6:00 AM",
    duration: "1 hour",
    status: "Paid",
    price: "$25",
  },
  {
    id: 2,
    gigId: "68d0478b1212d77cda75d49d",
    mentorId: "68cb1ad4590a54916cbb91b2",
    gigTitle: "Frontend React Debugging Session",
    mentorName: "Emily Watson",
    mentorImg: "https://i.pravatar.cc/150?img=5",
    date: "2025-12-10",
    time: "5:30 PM",
    duration: "45 minutes",
    status: "Paid",
    price: "$18",
  },
  {
    id: 3,
    gigId: "68d0478b1212d77cda75d49d",
    mentorId: "68cb1ad4590a54916cbb91b2",
    gigTitle: "C++ Beginner Live Coaching",
    mentorName: "Rahul Sharma",
    mentorImg: "https://i.pravatar.cc/150?img=9",
    date: "2025-12-12",
    time: "9:00 PM",
    duration: "1.5 hours",
    status: "Pending",
    price: "$30",
  },
  {
    id: 3,
    gigId: "68d0478b1212d77cda75d49d",
    mentorId: "68cb1ad4590a54916cbb91b2",
    gigTitle: "C++ Beginner Live Coaching",
    mentorName: "Rahul Sharma",
    mentorImg: "https://i.pravatar.cc/150?img=9",
    date: "2025-12-12",
    time: "9:00 PM",
    duration: "1.5 hours",
    status: "Cancled",
    price: "$30",
  },
];

const Bookings = () => {
  const isCurrentSession = (date, time) => {
    const bookingDateTime = new Date(`${date} ${time}`);
    const now = new Date();

    // Time difference in minutes
    const diff =
      Math.abs(bookingDateTime.getTime() - now.getTime()) / (1000 * 60);

    // If the session is happening within 30 mins (before or after)
    return diff <= 30;
  };
  return (
    <div className="min-h-screen pt-24 w-11/12 mx-auto pb-20">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-10 text-gray-900 dark:text-gray-100">
        My Bookings
      </h1>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {dummyBookings.map((booking) => (
          // booking card
          <div
            key={booking.id}
            className="
            flex flex-col justify-between
              bg-white dark:bg-primary/5
              border border-gray-200 dark:border-gray-700 
              rounded-xl p-5 shadow-sm
              
            "
          >
            {/* Top: Gig Title */}
            <div className="flex items-start justify-between">
              <Link to={`/dashboard/learner/gig-details/${booking.gigId}`}>
                <h2 className="text-xl hover:text-primary cursor-pointer font-semibold leading-snug ">
                  {booking.gigTitle}
                </h2>
              </Link>

              {/* Status Badge */}
              <span
                className={`
                  px-2 py-1 text-xs rounded-md font-semibold
                  ${
                    booking.status === "Paid"
                      ? "bg-green-100 text-green-700 dark:bg-green-600/20 dark:text-green-300"
                      : booking.status === "Cancled"
                      ? "bg-red-100 text-red-500 dark:bg-red-500/10 "
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-600/20 dark:text-yellow-300"
                  }
                `}
              >
                {booking.status}
              </span>
            </div>

            {/* Mentor (smaller now) */}
            <Link
              to={`/dashboard/learner/mentor-profile/${booking.mentorId}`}
              className="flex items-center gap-2 mt-3 cursor-pointer hover:text-primary"
            >
              <img
                src={booking.mentorImg}
                alt={booking.mentorName}
                className="w-10 h-10 rounded-full object-cover border dark:border-gray-600"
              />
              <p className="text-sm ">{booking.mentorName}</p>
            </Link>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

            {/* Booking Details */}
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span className="font-medium">Date</span>
                <span>{booking.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Time</span>
                <span>{booking.time}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Duration</span>
                <span>{booking.duration}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Price</span>
                <span>{booking.price}</span>
              </div>
            </div>
            {isCurrentSession(booking.date, booking.time) &&
              booking.status !== "Cancled" && (
                <p className="mt-3 text-sm font-medium text-amber-600 dark:text-amber-400">
                  ⚠️ Your session may start within the next 30 minutes.
                </p>
              )}
            {/* Bottom Buttons */}
            {booking.status != "Cancled" && (
              <div className="mt-5 flex gap-3">
                <button
                  className={`
                  flex-1 px-4 py-2 rounded-lg ${
                    isCurrentSession(booking.date, booking.time)
                      ? "bg-primary"
                      : booking.status.toLowerCase() === "pending"
                      ? "bg-amber-400/50 hover:bg-amber-500"
                      : "bg-primary/50 hover:bg-primary"
                  }
                   text-white font-medium 
                   transition
                `}
                >
                  {isCurrentSession(booking.date, booking.time)
                    ? "Join Now"
                    : booking.status.toLowerCase() === "pending"
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
        ))}
      </div>
    </div>
  );
};

export default Bookings;
