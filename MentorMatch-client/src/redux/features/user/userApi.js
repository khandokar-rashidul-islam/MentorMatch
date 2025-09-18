import { baseApi } from "../../api/baseApi";
import { setUser } from "../auth/authSlice";
import { logout } from "../auth/authSlice";
import { clearPersistedAuth } from "../../../utils/clearPersistedAuth";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["UserProfile"],
      keepUnusedDataFor: 0, // remove cache immediately when not used
    }),

    editActiveProfile: builder.mutation({
      query: (formData) => ({
        url: "/users/edit",
        method: "PATCH",
        body: formData,
      }),
      async onQueryStarted(formData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data.data.user }));
          dispatch(baseApi.util.invalidateTags(["UserProfile"]));
        } catch (err) {
          console.error("Profile update failed:", err);
          await clearPersistedAuth();
          dispatch(logout());
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetActiveProfileQuery, useEditActiveProfileMutation } = userApi;
