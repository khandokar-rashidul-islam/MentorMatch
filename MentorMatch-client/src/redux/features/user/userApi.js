import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveProfile: builder.query({
      query: () => "/users/profile", 
      providesTags: ["UserProfile"], 
    }),
  }),
});

export const { useGetActiveProfileQuery } = userApi;
