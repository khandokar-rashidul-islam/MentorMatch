import { baseApi } from "../../api/baseApi";

export const mentorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //* Create Gig
    createGig: builder.mutation({
      query: (gigData) => ({
        url: "/mentors/gig-create",
        method: "POST",
        body: gigData,
      }),
      invalidatesTags: ["MyGigs"],
    }),

    //* Update Gig
    updateGig: builder.mutation({
      query: ({ id, gigData }) => ({
        url: `/mentors/gig-edit/${id}`,
        method: "PATCH",
        body: gigData,
      }),
      invalidatesTags: ["MyGigs", "GigDetails"],
    }),

    //* Delete Gig
    deleteGig: builder.mutation({
      query: (id) => ({
        url: `/mentors/gig-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyGigs"],
    }),

    //* Get Single Gig (public)
    getGigById: builder.query({
      query: (id) => `/mentors/gig-details/${id}`,
      providesTags: (result, error, id) => [{ type: "GigDetails", id }],
    }),

    //* Get My Gigs (mentor only)
    getMyGigs: builder.query({
      query: () => "/mentors/my-gigs",
      providesTags: ["MyGigs"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateGigMutation,
  useUpdateGigMutation,
  useDeleteGigMutation,
  useGetGigByIdQuery,
  useGetMyGigsQuery,
} = mentorApi;
