import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout , setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { clearPersistedAuth } from "../../utils/clearPersistedAuth";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include", // send cookies automatically
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  console.log("Base Query Result:", result); // Debug log
  if (result?.error?.status === 401) {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/refresh-token",
        {
          method: "POST",
          credentials: "include", // include refresh token cookie
        }
      );
      if (!res.ok) {
        // Refresh token expired or invalid
        console.log("Refresh token expired, logging out...");
        await clearPersistedAuth();
        api.dispatch(logout());
        return result;
      }

      const data = await res.json();

      if (data?.data?.user) {
        const user = data.data.user;
        // Update Redux state with new user info
        api.dispatch(setUser({ user }));
        // Retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("Refresh token invalid, logging out...");
        await clearPersistedAuth();
        api.dispatch(logout());
      }

    } catch (err) {
      console.log("Refresh request failed:", err);
      await clearPersistedAuth();
      api.dispatch(logout());
    }
  }

  if (result?.error?.status === 403 || result?.error?.status === 404)
    toast.error(result.error.data?.message || "Something went wrong");

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "User",
    "Admin",
    "Mentor",
    "Learner",
    "MentorReviews",
    "Reviews",
    "Gigs",
    "MentorReviews",
    "Conversations",
    "Messages",
    "LearnerOrders",
    "MentorOrders",
    "Order",
    "Session",
    "UserProfile",
  ],
  endpoints: () => ({}),
});
