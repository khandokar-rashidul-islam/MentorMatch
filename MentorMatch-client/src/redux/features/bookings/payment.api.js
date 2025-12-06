import { baseApi } from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1) INITIATE PAYMENT
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: "/payment/initiate",
        method: "POST",
        body: data,
      }),
    }),

    // 2) GET ORDER DETAILS (optional — after success redirect)
    getOrderByTransaction: builder.query({
      query: (transactionId) => `/orders/${transactionId}`,
      providesTags: ["Order"],
    }),
  }),
});

export const { useInitiatePaymentMutation, useGetOrderByTransactionQuery } =
  paymentApi;
