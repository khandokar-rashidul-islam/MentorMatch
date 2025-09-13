import { clearPersistedAuth } from "../../../utils/clearPersistedAuth";
import { baseApi } from "../../api/baseApi";
import { setUser, logout } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Bootstrap /auth/me
    getMe: builder.query({
      query: () => "/auth/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data.data.user }));
        } catch {
          await clearPersistedAuth();
          dispatch(logout());
        }
      },
    }),

    // login
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data.data.user }));
        } catch {
          await clearPersistedAuth();
          dispatch(logout());
        }
      },
    }),

    // register
    register: builder.mutation({
      query: (formData) => ({
        url: "/users/register",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data.data.user }));
        } catch {
          await clearPersistedAuth();
          dispatch(logout());
        }
      },
    }),

    // logout
    logout: builder.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(_, { dispatch }) {
        await clearPersistedAuth();
        dispatch(logout());
      },
    }),

    // toggle role
    toggleRole: builder.mutation({
      query: () => ({ url: "/users/active-role/toggle", method: "PATCH" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data.data.user }));
          dispatch(baseApi.util.invalidateTags(["UserProfile"]));
        } catch {
          await clearPersistedAuth();
          dispatch(logout());
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useToggleRoleMutation,
} = authApi;
