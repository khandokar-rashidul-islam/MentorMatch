/* eslint-disable @typescript-eslint/no-explicit-any */
import SSLCommerzPayment from "sslcommerz-lts";
import { Types } from "mongoose";
import config from "../../config";
import { getPlanMeta } from "./payment.utils";
import { GigModel } from "../mentor/mentor.model";
import { OrderModel, SessionModel } from "./order.model";
import { v4 as uuidv4 } from "uuid";

// Initiate Payment
export const initiatePaymentService = async (payload: {
  learnerUserId: string;
  mentorUserId: string;  
  gigId: string;
  planType: string;
  packageType?: string;
  learnerName?: string;
  email?: string;
  phone?: string;
}) => {
  const { learnerUserId, mentorUserId, gigId, planType, packageType, learnerName, email, phone } = payload;

  const gigDoc = await GigModel.findById(gigId);
  if (!gigDoc) throw new Error("Gig not found");

  // Calculate Price (Same logic as before)
  let price = 0;
  let planName = "";
  if (planType === "instant") {
    price = gigDoc.plans?.instant?.price ?? 0;
    planName = "Instant Session";
  } else {
    if (!packageType) throw new Error("packageType required");
    const p = (gigDoc.plans as any)[planType]?.[packageType];
    price = p.price ?? 0;
    planName = `${planType}-${packageType}`;
  }

  if (price <= 0) throw new Error("Invalid price");

  const { durationPerSessionMinutes, durationSessions, endDate } = getPlanMeta(planType);
  const transactionId = `TXN-${Date.now()}`;

  // Create Order with USER IDs
  const order = await OrderModel.create({
    learner: new Types.ObjectId(learnerUserId),
    mentor: new Types.ObjectId(mentorUserId),
    gig: new Types.ObjectId(gigId),
    planType,
    packageType,
    planName,
    price,
    currency: "BDT",
    durationPerSessionMinutes,
    durationSessions,
    startDate: new Date(),
    endDate,
    transactionId,
    paymentStatus: "pending",
    orderStatus: "pending",
  });

  // SSL Payload (Same as before)
  const sslData = {
    total_amount: price,
    currency: "BDT",
    tran_id: transactionId,
    success_url: `${config.backEnd_url}/api/v1/payment/success/${transactionId}`,
    fail_url: `${config.backEnd_url}/api/v1/payment/fail/${transactionId}`,
    cancel_url: `${config.backEnd_url}/api/v1/payment/cancel/${transactionId}`,
    ipn_url: `${config.backEnd_url}/api/v1/payment/ipn`,
    product_name: planName,
    product_category: "Education",
    product_profile: "general",
    cus_name: learnerName || "Learner",
    cus_email: email || "user@example.com",
    cus_add1: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: phone || "01700000000",
    shipping_method: "NO"
  };

  const sslcz = new SSLCommerzPayment(
    config.sslcmz_store_id as string,
    config.sslcmz_store_password as string,
    config.sslcmz_is_live === "false" ? false : true
  );

  const apiResponse = await sslcz.init(sslData);

  await OrderModel.findByIdAndUpdate(order._id, {
    sslSessionKey: apiResponse?.sessionkey,
    paymentGatewayResponse: apiResponse
  });

  return {
    redirectUrl: apiResponse?.GatewayPageURL,
    transactionId
  };
};

// Handle Success (Create Session)
export const handlePaymentSuccess = async (transactionId: string, rawBody: any) => {
  const order = await OrderModel.findOneAndUpdate(
    { transactionId },
    {
      paymentStatus: "success",
      orderStatus: "upcoming",
      paymentGatewayResponse: rawBody,
    },
    { new: true }
  );

  if (!order) return null;

  // Create Session
  const startTime = new Date(order.startDate);
  const endTime = new Date(startTime.getTime() + order.durationPerSessionMinutes * 60000);

  const existingSession = await SessionModel.findOne({ order: order._id });

  if (!existingSession) {
    await SessionModel.create({
      order: order._id,
      gig: order.gig,
      learner: order.learner, // This is User ID now
      mentor: order.mentor,   // This is User ID now
      meetingId: uuidv4(),
      startTime: startTime,
      endTime: endTime,
      durationMinutes: order.durationPerSessionMinutes,
      status: "scheduled",
    });
  }
  return order;
};

export const handlePaymentFail = async (
  transactionId: string,
  rawBody: Record<string, unknown>
) => {
  const order = await OrderModel.findOneAndUpdate(
    { transactionId },
    {
      paymentStatus: rawBody?.status === "CANCELLED" ? "cancelled" : "failed",
      orderStatus: rawBody?.status === "CANCELLED" ? "cancelled" : "pending",
      paymentGatewayResponse: rawBody,
    },
    { new: true }
  );
  return order;
};

// ===================== GET LEARNER ORDERS =====================
export const getLearnerOrdersService = async (userId: string) => {
  // Querying by 'learner' field which now holds the User ID
  const orders = await OrderModel.find({ learner: userId })
    .populate({
      path: "gig",
      select: "gigTitle aboutGig",
    })
    .populate({
      path: "mentor", // Populates the User model
      select: "email",
      populate: {
        path: "mentorProfile", // Populates the Virtual 'mentorProfile' from User
        select: "name profileImage profession",
      },
    })
    .populate("session") // <--- CRITICAL: Populates the Virtual 'session' for WebRTC
    .select({ __v: 0, paymentGatewayResponse: 0 })
    .sort({ createdAt: -1 });

  return orders;
};

// ===================== GET MENTOR ORDERS =====================
export const getMentorOrdersService = async (userId: string) => {
  // Querying by 'mentor' field which now holds the User ID
  const orders = await OrderModel.find({ mentor: userId })
    .populate({
      path: "gig",
      select: "gigTitle",
    })
    .populate({
      path: "learner", // Populates the User model
      select: "email",
      populate: {
        path: "learnerProfile", // Populates the Virtual 'learnerProfile' from User
        select: "name profileImage",
      },
    })
    .populate("session") // <--- CRITICAL: Populates the Virtual 'session' for WebRTC
    .select({ __v: 0, paymentGatewayResponse: 0 })
    .sort({ createdAt: -1 });

  return orders;
};
