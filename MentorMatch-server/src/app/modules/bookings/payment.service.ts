/* eslint-disable @typescript-eslint/no-explicit-any */
import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";
import { getPlanMeta } from "./payment.utils";
import { GigModel } from "../mentor/mentor.model";
import { OrderModel } from "./order.model";

export const initiatePaymentService = async (payload: {
  learner: string;
  gig: string;
  planType: string;
  packageType?: string;
  learnerName?: string;
  email?: string;
  phone?: string;
}) => {
  const { learner, gig, planType, packageType, learnerName, email, phone } =
    payload;

  // 1. Validate gig
  const gigDoc = await GigModel.findById(gig).populate("user");
  if (!gigDoc) throw new Error("Gig not found");

  const mentor = (gigDoc.user as any)?._id;

  // 2. Determine price dynamically
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

  // 3. Session metadata
  const { durationPerSessionMinutes, durationSessions, endDate } =
    getPlanMeta(planType);

  const transactionId = `TXN-${Date.now()}`;

  // 4. Create locked pending order
  const order = await OrderModel.create({
    learner,
    mentor,
    gig,
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

  // 5. SSLCOMMERZ Payload (FINAL / CORRECTED)
  const sslData = {
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

    // Required customer fields
    cus_name: learnerName || "Learner",
    cus_email: email || "noreply@example.com",
    cus_phone: phone || "01700000000",

    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1207",
    cus_country: "Bangladesh",

    // REQUIRED SHIPPING FIELD
    shipping_method: "NO",

    // If shipping_method = NO, shipping address is optional but safe to include
    ship_name: learnerName || "Learner",
    ship_add1: "Dhaka",
    ship_city: "Dhaka",
    ship_postcode: "1207",
    ship_country: "Bangladesh",
  };

  console.log("🔹 SSL Payload Sent:", sslData);

  // 6. Initialize Gateway
  const sslcz = new SSLCommerzPayment(
    config.sslcmz_store_id as string,
    config.sslcmz_store_password as string,
    config.sslcmz_is_live === "false" ? false : true
  );

  const apiResponse = await sslcz.init(sslData);

  console.log("🔹 SSLCommerz API Response:", apiResponse);

  // Save response for debugging
  await OrderModel.findByIdAndUpdate(order._id, {
    sslSessionKey: apiResponse?.sessionkey || apiResponse?.session_key || null,
    paymentGatewayResponse: apiResponse || {},
  });
  console.log(apiResponse?.GatewayPageURL)

  return {
    redirectUrl: apiResponse?.GatewayPageURL || "",
    transactionId,
  };
};

//----------- Handle payment success-----------
export const handlePaymentSuccess = async (
  transactionId: string,
  rawBody: Record<string, unknown>
) => {
  return await OrderModel.findOneAndUpdate(
    { transactionId },
    {
      paymentStatus: "success",
      orderStatus: "upcoming",
      paymentGatewayResponse: rawBody,
    },
    { new: true }
  );
};

//-----------Handle payment fail----------
export const handlePaymentFail = async (
  transactionId: string,
  rawBody: Record<string, unknown>
) => {
  return await OrderModel.findOneAndUpdate(
    { transactionId },
    {
      paymentStatus: rawBody?.status === "CANCELLED" ? "cancelled" : "failed",
      orderStatus: rawBody?.status === "CANCELLED" ? "cancelled" : "pending",
      paymentGatewayResponse: rawBody,
    },
    { new: true }
  );
};
