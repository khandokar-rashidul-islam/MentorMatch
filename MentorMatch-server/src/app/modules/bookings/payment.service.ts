/* eslint-disable @typescript-eslint/no-explicit-any */
import SSLCommerzPayment from "sslcommerz-lts";
import { Types } from "mongoose";
import config from "../../config";
import { getPlanMeta } from "./payment.utils";
import { GigModel } from "../mentor/mentor.model";
import { OrderModel } from "./order.model";

/**
 * Payload uses PROFILE ids and gig id as strings.
 */
export const initiatePaymentService = async (payload: {
  learnerProfileId: string; // LearnerProfile._id (not User._id)
  mentorProfileId: string; // MentorProfile._id (not User._id)
  gigId: string; // Gig._id
  planType: string;
  packageType?: string;
  learnerName?: string;
  email?: string;
  phone?: string;
}) => {
  const {
    learnerProfileId,
    mentorProfileId,
    gigId,
    planType,
    packageType,
    learnerName,
    email,
    phone,
  } = payload;

  // validate gig exists
  const gigDoc = await GigModel.findById(gigId).populate("user");
  if (!gigDoc) throw new Error("Gig not found");

  // determine price
  let price = 0;
  let planName = "";

  if (planType === "instant") {
    price = gigDoc.plans?.instant?.price ?? 0;
    planName = "Instant Session";
  } else {
    if (!packageType)
      throw new Error("packageType is required for weekly/monthly plans");
    const p = (gigDoc.plans as any)[planType]?.[packageType];
    if (!p) throw new Error("Selected package not found in gig");
    price = p.price ?? 0;
    planName = `${planType}-${packageType}`;
  }

  if (price <= 0) throw new Error("Invalid price. Cannot process payment.");

  const { durationPerSessionMinutes, durationSessions, endDate } =
    getPlanMeta(planType);
  const transactionId = `TXN-${Date.now()}`;

  // create order using PROFILE ObjectIds (convert strings to ObjectId)
  const order = await OrderModel.create({
    learner: new Types.ObjectId(learnerProfileId),
    mentor: new Types.ObjectId(mentorProfileId),
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

  // SSLCommerz payload
  const sslData: Record<string, any> = {
    total_amount: price,
    currency: "BDT",
    tran_id: transactionId,
    success_url: `${config.backEnd_url}/api/v1/payment/success/${transactionId}`,
    fail_url: `${config.backEnd_url}/api/v1/payment/fail/${transactionId}`,
    cancel_url: `${config.backEnd_url}/api/v1/payment/cancel/${transactionId}`,
    ipn_url: `${config.backEnd_url}/api/v1/payment/ipn`,
    product_name: planName,
    product_category: "Online Tuition",
    product_profile: "service",
    cus_name: learnerName || "Learner",
    cus_email: email || "noreply@example.com",
    cus_phone: phone || "01700000000",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1207",
    cus_country: "Bangladesh",
    shipping_method: "NO",
    ship_name: learnerName || "Learner",
    ship_add1: "Dhaka",
    ship_city: "Dhaka",
    ship_postcode: "1207",
    ship_country: "Bangladesh",
  };

  console.log("🔹 SSL Payload Sent:", sslData);

  const sslcz = new SSLCommerzPayment(
    config.sslcmz_store_id as string,
    config.sslcmz_store_password as string,
    config.sslcmz_is_live === "false" ? false : true
  );

  const apiResponse = await sslcz.init(sslData);
  console.log("🔹 SSLCommerz API Response:", apiResponse);

  // persist SSL response on order
  await OrderModel.findByIdAndUpdate(order._id, {
    sslSessionKey: apiResponse?.sessionkey || apiResponse?.session_key || null,
    paymentGatewayResponse: apiResponse || {},
  });

  return {
    redirectUrl: apiResponse?.GatewayPageURL || "",
    transactionId,
  };
};

// ---------- success/fail handlers ----------
export const handlePaymentSuccess = async (
  transactionId: string,
  rawBody: Record<string, unknown>
) => {
  const order = await OrderModel.findOneAndUpdate(
    { transactionId },
    {
      paymentStatus: "success",
      orderStatus: "upcoming",
      paymentGatewayResponse: rawBody,
    },
    { new: true }
  );
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

// =========== order listing helpers with nested populate ===========
export const getLearnerOrdersService = async (learnerProfileId: string) => {
  return await OrderModel.find({ learner: learnerProfileId })
    .populate({
      path: "gig",
      model: "Gig",
      select: "gigTitle aboutGig",
    })
    .populate({
      path: "mentor",
      model: "MentorProfile",
      select: "name phone profileImage user",
      populate: {
        path: "user",
        model: "User",
        select: "email activeRole",
      },
    })
    .select({ __v: 0, paymentGatewayResponse: 0 })
    .sort({ createdAt: -1 });
};

export const getMentorOrdersService = async (mentorProfileId: string) => {
  return await OrderModel.find({ mentor: mentorProfileId })
    .populate({
      path: "gig",
      model: "Gig",
      select: "gigTitle aboutGig",
    })
    .populate({
      path: "learner",
      model: "LearnerProfile",
      select: "name phone profileImage user",
      populate: {
        path: "user",
        model: "User",
        select: "email activeRole",
      },
    })
    .select({ __v: 0, paymentGatewayResponse: 0 })
    .sort({ createdAt: -1 });
};

