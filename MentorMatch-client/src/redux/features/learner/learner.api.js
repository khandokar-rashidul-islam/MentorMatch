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
  }),
});

export const {
  useApplyForMentorMutation,
  useGetLearnerDashboardQuery,
  useCreateReviewMutation,
  useGetReviewsByGigQuery,
  useToggleHelpfulMutation,
} = learnerApi;
