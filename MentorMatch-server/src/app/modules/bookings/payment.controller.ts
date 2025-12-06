/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import * as paymentService from "./payment.service";

export const initiatePayment = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const learner = (req as any).user?.id;
    if (!learner) throw new Error("Unauthorized");

    const result = await paymentService.initiatePaymentService({
      learner,
      gig: data.gig,
      planType: data.planType,
      packageType: data.packageType,
      learnerName: data.learnerName,
      email: data.email,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment session created",
      data: result,
    });
  }
);

// Called by SSLCommerz (POST)
export const success = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.transactionId;
  await paymentService.handlePaymentSuccess(transactionId, req.body);
  // Redirect learner to frontend success page
  return res.redirect(
    `${process.env.FRONTEND_URL}/dashboard/learner/payment-success`
  );
});

export const fail = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.transactionId;
  await paymentService.handlePaymentFail(transactionId, req.body);
  return res.redirect(
    `${process.env.FRONTEND_URL}/dashboard/learner/payment-failed`
  );
});

export const cancel = catchAsync(async (req: Request, res: Response) => {
  // Some gateways call cancel with tran_id in body/query — handle if needed
  return res.redirect(
    `${process.env.FRONTEND_URL}/dashboard/learner/payment-cancelled`
  );
});

/**
 * IPN: server-to-server asynchronous notification.
 * Validate the ipn with SSLCOMMERZ if you want (recommended).
 * For extra security implement server-side validation using SSLCOMMERZ validation API.
 */
export const ipn = catchAsync(async (req: Request, res: Response) => {
  const ipnBody = req.body;
  const transactionId = ipnBody.tran_id || ipnBody.tran_id_from_api || null;
  if (!transactionId) {
    // some ipn payloads differ; log then respond
    console.warn("IPN received with no tran_id", ipnBody);
    return res.status(400).send("tran_id missing");
  }

  // Basic update: if status indicates success, mark paid else failed
  // You should validate with SSLCOMMERZ validation API here
  const status =
    ipnBody.status ||
    ipnBody.status_code ||
    ipnBody.transactions_status ||
    null;
  if (status === "VALID" || status === "Success" || status === "SUCCESS") {
    await paymentService.handlePaymentSuccess(transactionId, ipnBody);
  } else {
    await paymentService.handlePaymentFail(transactionId, ipnBody);
  }

  res.status(200).send("IPN processed");
});
