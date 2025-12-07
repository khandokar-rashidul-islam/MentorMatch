/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import * as paymentService from "./payment.service";
import { GigModel } from "../mentor/mentor.model";
import { LearnerProfileModel } from "../learner/learner.model";
import { MentorProfileModel } from "../mentor/mentor.model";

export const initiatePayment = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Unauthorized");

    if (!data.gig) throw new Error("Gig id (gig) is required in body");
    if (!data.planType) throw new Error("planType is required in body");

    // 1) find learner profile by logged-in user
    const learnerProfile = await LearnerProfileModel.findOne({ user: userId });
    if (!learnerProfile)
      throw new Error("Learner profile not found for current user");

    // 2) find gig and its owner (user)
    const gig = await GigModel.findById(data.gig).populate("user");
    if (!gig) throw new Error("Gig not found");

    const gigOwnerUserId = (gig.user as any)?._id;
    if (!gigOwnerUserId) throw new Error("Gig owner (user) not found");

    // 3) find mentor profile for that gig owner user
    const mentorProfile = await MentorProfileModel.findOne({
      user: gigOwnerUserId,
    });
    if (!mentorProfile)
      throw new Error("Mentor profile not found for gig owner");

    // 4) call service with PROFILE ids (strings)
    const result = await paymentService.initiatePaymentService({
      learnerProfileId: learnerProfile._id.toString(),
      mentorProfileId: mentorProfile._id.toString(),
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

  // fetch learner profile id
  const learner = await LearnerProfileModel.findOne({ user: userId });
  if (!learner) throw new Error("Learner profile not found");

  const orders = await paymentService.getLearnerOrdersService(learner._id.toString());

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

  // fetch mentor profile id
  const mentor = await MentorProfileModel.findOne({ user: userId });
  if (!mentor) throw new Error("Mentor profile not found");

  const orders = await paymentService.getMentorOrdersService(mentor._id.toString());

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Mentor orders retrieved successfully",
    data: orders,
  });
});