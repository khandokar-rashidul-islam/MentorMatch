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
      providesTags: (result, error, mentorId) => [
        { type: "Mentor", id: mentorId },
      ],
    }),

    // === geet all mentors with filters endpoint ===
    getAllMentors: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `learners/mentor-list?${queryString}`;
      },
      providesTags: ["Mentors"],
    }),

    //* ============ Reviews Endpoints ==========

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

    //* =========== Gigs Endpoints ==============

    getAllGigs: builder.query({
      // optional filters (like ?category=design&page=2)
      query: (params) => ({
        url: "/learners/gigs",
        method: "GET",
        params, // query string
      }),
      providesTags: ["Gigs"],
    }),

    //* ======== Gigs by User ID Endpoint =======
    getGigsByUserId: builder.query({
      query: (userId) => `/learners/user-gigs/${userId}`,
      providesTags: (result, error, userId) => [{ type: "Gigs", id: userId }],
    }),

    //*========== mentor review endpoints ===========
    // Submit a review for a mentor
    createMentorReview: builder.mutation({
      query: ({ mentorId, rating, comment }) => ({
        url: `/learners/mentor-reviews/${mentorId}/reviews`,
        method: "POST",
        body: { rating, comment },
      }),
      invalidatesTags: (result, error, { mentorId }) => [
        { type: "MentorReviews", id: mentorId },
      ],
    }),

    // Fetch all reviews for a specific mentor
    getMentorReviews: builder.query({
      query: (mentorId) => `/learners/mentor-reviews/${mentorId}/reviews`,
      providesTags: (result, error, mentorId) => [
        { type: "MentorReviews", id: mentorId },
      ],
    }),
    // Toggle helpful count for a mentor review
    toggleMentorHelpful: builder.mutation({
      query: ({ reviewId }) => ({
        url: `/learners/mentor-reviews/helpful/${reviewId}`,
        method: "PATCH",
      }),
      invalidatesTags: () => [{ type: "MentorReviews" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useApplyForMentorMutation,
  useGetLearnerDashboardQuery,
  useGetAllGigsQuery,
  useCreateReviewMutation,
  useGetReviewsByGigQuery,
  useToggleHelpfulMutation,
  useGetMentorByIdQuery,
  useGetAllMentorsQuery,
  useGetGigsByUserIdQuery,
  useCreateMentorReviewMutation,
  useGetMentorReviewsQuery,
  useToggleMentorHelpfulMutation,
} = learnerApi;
