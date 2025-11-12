import { baseApi } from "../../api/baseApi";

export const learnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // === Learner Endpoints ===
    applyForMentor: builder.mutation({
      query: (data) => ({
        url: "/learners/apply-mentor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Learner"],
    }),
    getLearnerDashboard: builder.query({
      query: () => "/learners/dashboard",
      providesTags: ["Learner"],
    }),

// === Mentor Public Profile Endpoint ===
    getMentorById: builder.query({
      query: (mentorId) => `/learners/mentor-details/${mentorId}`,
      providesTags: (result, error, mentorId) => [{ type: "Mentor", id: mentorId }],
    }),

    // === Reviews Endpoints ===

    // Submit a review for a gig
    createReview: builder.mutation({
      query: ({ gigId, rating, comment }) => ({
        url: `/learners/reviews/${gigId}`,
        method: "POST",
        body: { rating, comment },
      }),
      invalidatesTags: (result, error, { gigId }) => [
        { type: "Reviews", id: gigId },
      ],
    }),

    // Get all reviews for a gig
    getReviewsByGig: builder.query({
      query: (gigId) => `/learners/reviews/${gigId}`,
      providesTags: (result, error, gigId) => [{ type: "Reviews", id: gigId }],
    }),

    // Toggle helpful count for a review
    toggleHelpful: builder.mutation({
      query: ({ reviewId }) => ({
        url: `/learners/reviews/helpful/${reviewId}`,
        method: "PATCH",
      }),
      // Invalidate all reviews cache (optional: could be more selective)
      invalidatesTags: () => [{ type: "Reviews" }],
    }),
     // === Gigs Endpoints ===
    getAllGigs: builder.query({
      // optional filters (like ?category=design&page=2)
      query: (params) => ({
        url: "/learners/gigs",
        method: "GET",
        params, // query string
      }),
      providesTags: ["Gigs"],
    }),
  }),
});

export const {
  useApplyForMentorMutation,
  useGetLearnerDashboardQuery,
  useGetAllGigsQuery,
  useCreateReviewMutation,
  useGetReviewsByGigQuery,
  useToggleHelpfulMutation,
  useGetMentorByIdQuery,
} = learnerApi;
