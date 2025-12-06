import { Router } from "express";
import * as paymentController from "./payment.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../user/user.constant";

const router = Router();

router.post(
  "/initiate",
  auth(USER_ROLES.LEARNER, USER_ROLES.MENTOR),
  paymentController.initiatePayment
);

// SSLCOMMERZ will POST to these endpoints
router.post("/success/:transactionId", paymentController.success);
router.post("/fail/:transactionId", paymentController.fail);
router.post("/cancel/:transactionId", paymentController.cancel);
router.post("/ipn", paymentController.ipn);

export const PaymentRoutes = router;
