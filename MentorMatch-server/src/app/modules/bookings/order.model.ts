import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    learner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gig: { type: Schema.Types.ObjectId, ref: "Gig", required: true },

    planType: { type: String, required: true }, // instant | weekly | monthly
    packageType: { type: String }, // basic | intensive | premium | elite
    planName: { type: String }, // e.g., "instant", "weekly - basic", "monthly - premium"

    price: { type: Number, required: true },
    currency: { type: String, default: "BDT" },

    // SESSION / DURATION MANAGEMENT
    durationPerSessionMinutes: { type: Number, required: true }, // e.g., 60 min per session
    durationSessions: { type: Number, default: 1 }, // instant = 1, weekly = e.g., 3, monthly = e.g., 12
    completedSessions: { type: Number, default: 0 },

    // ACCESS VALIDITY
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date }, // auto-calculated for weekly/monthly plans

    // PAYMENT TRACKING (SSLCommerz)
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "cancelled", "refunded"],
      default: "pending",
    },
    transactionId: { type: String }, // sslcommerz trans_id
    sslSessionKey: { type: String }, // returned by init API
    paymentGatewayResponse: { type: Schema.Types.Mixed }, // raw SSLCommerz response JSON

    orderStatus: {
      type: String,
      enum: ["pending", "upcoming", "completed", "cancelled"],
      default: "pending",
    },

    // optional: metadata for scheduling
    timezone: { type: String, default: "Asia/Dhaka" },
  },
  { timestamps: true }
);

export const OrderModel = model("Order", OrderSchema);
