/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import * as paymentService from "./payment.service";
import { GigModel } from "../mentor/mentor.model";
import { LearnerProfileModel } from "../learner/learner.model";
import { MentorProfileModel } from "../mentor/mentor.model";
import AppError from "../../errors/AppError";
import { SessionModel } from "./order.model";

export const initiatePayment = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const userId = (req as any).user?.id; // Logged in User ID
    if (!userId) throw new Error("Unauthorized");

    // 1. Validate Learner Profile exists (just a check)
    const learnerProfile = await LearnerProfileModel.findOne({ user: userId });
    if (!learnerProfile)
      throw new Error("Please complete your learner profile first");

    // 2. Validate Gig & Mentor
    const gig = await GigModel.findById(data.gig).populate("user");
    if (!gig) throw new Error("Gig not found");

    const gigOwnerUserId = (gig.user as any)?._id; // Mentor's User ID

    // Check if mentor profile exists
    const mentorProfile = await MentorProfileModel.findOne({
      user: gigOwnerUserId,
    });
    if (!mentorProfile) throw new Error("Mentor profile unavailable");

    // 3. Initiate Service with USER IDs
    const result = await paymentService.initiatePaymentService({
      learnerUserId: userId, 
      mentorUserId: gigOwnerUserId.toString(), 
      gigId: gig._id.toString(),
      planType: data.planType,
      packageType: data.packageType,
      learnerName: data.learnerName,
      email: data.email,
      phone: data.phone,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment session created",
      data: result,
    });
  }
);

// Called by SSLCOMMERZ (POST)
export const success = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.transactionId;
  await paymentService.handlePaymentSuccess(transactionId, req.body);
  return res.redirect(
    `${process.env.FRONTEND_URL}/dashboard/learner/payment-success/${transactionId}`
  );
});

export const fail = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.transactionId;
  await paymentService.handlePaymentFail(transactionId, req.body);
  return res.redirect(
    `${process.env.FRONTEND_URL}/dashboard/learner/payment-failed/${transactionId}`
  );
});

export const cancel = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.transactionId;
  await paymentService.handlePaymentFail(transactionId, {
    status: "CANCELLED",
  });
  return res.redirect(
    `${process.env.FRONTEND_URL}/dashboard/learner/payment-cancelled`
  );
});

export const ipn = catchAsync(async (req: Request, res: Response) => {
  const ipnBody = req.body;
  const transactionId = ipnBody.tran_id || ipnBody.tran_id_from_api || null;
  if (!transactionId) return res.status(400).send("tran_id missing");

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


// ===================== LEARNER ORDERS =====================
export const getLearnerOrders = catchAsync(async (req, res) => {
  const userId = (req as any).user?.id;
  
  // FIX: Don't look up LearnerProfile. Pass userId directly.
  const orders = await paymentService.getLearnerOrdersService(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Learner orders retrieved successfully",
    data: orders,
  });
});

// ===================== MENTOR ORDERS =====================
export const getMentorOrders = catchAsync(async (req, res) => {
  const userId = (req as any).user?.id;

  // FIX: Don't look up MentorProfile. Pass userId directly.
  const orders = await paymentService.getMentorOrdersService(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Mentor orders retrieved successfully",
    data: orders,
  });
});

// ====================== session =============================

export const verifySession = catchAsync(async (req, res) => {
  const { meetingId } = req.params;
  const userId = (req as any).user?.id;
  if (!userId) throw new Error("Unauthorized");

  const session = await SessionModel.findOne({ meetingId });
  if (!session) throw new AppError(httpStatus.NOT_FOUND, "Session not found");

  // 1. Check if user is a participant
  if (
    session.learner.toString() !== userId &&
    session.mentor.toString() !== userId
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized for this session"
    );
  }

  // 2. Check Time window (Join allowed 15 mins before start)
  const now = new Date();
  const startBuffer = new Date(session.startTime.getTime() - 15 * 60000);

  if (now < startBuffer) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `Session starts at ${session.startTime.toLocaleTimeString()}`
    );
  }

  if (session.status === "cancelled") {
    throw new AppError(httpStatus.FORBIDDEN, "Session was cancelled");
  }

  // 3. Update Status to 'ongoing' if it's the first person joining
  if (session.status === "scheduled") {
    session.status = "ongoing";
    await session.save();
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access granted",
    data: session,
  });
});
