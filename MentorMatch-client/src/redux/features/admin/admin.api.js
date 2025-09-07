import { baseApi } from "../../api/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    approveMentorApplication: builder.mutation({
      query: (applicationId) => ({
        url: `/admin/approve-mentor/${applicationId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Learner"],
    }),
    rejectMentorApplication: builder.mutation({
      query: (applicationId) => ({
        url: `/admin/reject-mentor/${applicationId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Learner"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/super-admin/create-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getAllAdmins: builder.query({
      query: () => "/admin/list",
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useApproveMentorApplicationMutation,
  useRejectMentorApplicationMutation,
  useCreateAdminMutation,
  useGetAllAdminsQuery,
} = adminApi;
