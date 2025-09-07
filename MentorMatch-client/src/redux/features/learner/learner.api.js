import { baseApi } from "../../api/baseApi";

export const learnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyForMentor: builder.mutation({
      query: (data) => ({
        url: "/learner/apply-mentor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Learner"],
    }),
    getLearnerDashboard: builder.query({
      query: () => "/learner/dashboard",
      providesTags: ["Learner"],
    }),
  }),
});

export const { useApplyForMentorMutation, useGetLearnerDashboardQuery } =
  learnerApi;
