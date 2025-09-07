import { baseApi } from "../../api/baseApi";

export const mentorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMentorDashboard: builder.query({
      query: () => "/mentor/dashboard",
      providesTags: ["Mentor"],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/mentor/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mentor"],
    }),
  }),
});

export const { useGetMentorDashboardQuery, useCreateCourseMutation } = mentorApi;
