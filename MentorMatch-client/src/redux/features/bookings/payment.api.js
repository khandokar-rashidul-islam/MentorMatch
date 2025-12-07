import { baseApi } from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===================== (1) INITIATE PAYMENT =====================
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: "/payment/initiate",
        method: "POST",
        body: data,
      }),
    }),

    // ===================== (2) GET ORDER BY TRANSACTION ID =====================
    getOrderByTransaction: builder.query({
      query: (transactionId) => `/orders/${transactionId}`,
      providesTags: ["Order"],
    }),

    // ===================== (3) GET LEARNER ORDERS =====================
    getLearnerOrders: builder.query({
      query: () => ({
        url: "/payment/learner/orders",
        method: "GET",
      }),
      providesTags: ["LearnerOrders"],
    }),

    // ===================== (4) GET MENTOR ORDERS =====================
    getMentorOrders: builder.query({
      query: () => ({
        url: "/payment/mentor/orders",
        method: "GET",
      }),
      providesTags: ["MentorOrders"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useInitiatePaymentMutation,
  useGetOrderByTransactionQuery,
  useGetLearnerOrdersQuery,
  useGetMentorOrdersQuery,
} = paymentApi;
