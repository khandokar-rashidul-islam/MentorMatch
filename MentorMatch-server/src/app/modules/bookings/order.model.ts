import { Schema, model } from "mongoose";

// --- ORDER SCHEMA ---
const OrderSchema = new Schema(
  {
    // Crucial: These store User._id (the login ID), NOT Profile._id
    learner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gig: { type: Schema.Types.ObjectId, ref: "Gig", required: true },

    planType: { type: String, required: true },
    packageType: { type: String },
    planName: { type: String },

    price: { type: Number, required: true },
    currency: { type: String, default: "BDT" },

    durationPerSessionMinutes: { type: Number, required: true },
    durationSessions: { type: Number, default: 1 },

    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "cancelled", "refunded"],
      default: "pending",
    },
    transactionId: { type: String },
    sslSessionKey: { type: String },
    paymentGatewayResponse: { type: Schema.Types.Mixed },

    orderStatus: {
      type: String,
      enum: ["pending", "upcoming", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Virtual to link Order -> Session easily
OrderSchema.virtual("session", {
  ref: "Session",
  localField: "_id",
  foreignField: "order",
  justOne: true,
});

OrderSchema.set("toObject", { virtuals: true });
OrderSchema.set("toJSON", { virtuals: true });

export const OrderModel = model("Order", OrderSchema);

// --- SESSION SCHEMA ---
const SessionSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    gig: { type: Schema.Types.ObjectId, ref: "Gig", required: true },

    // Store User IDs. This allows auth checks to pass regardless of activeRole.
    learner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },

    meetingId: { type: String, unique: true, required: true },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationMinutes: { type: Number, required: true },

    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

export const SessionModel = model("Session", SessionSchema);
