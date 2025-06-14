import Router from "express";
import {
  RazorpayKey,
  createOrder,
  verifyOrder,
  cancelOrder,
  allPayments,
} from "../controllers/paymentController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/razorpaykey", isLoggedIn, RazorpayKey);
router.post("/create", isLoggedIn, createOrder);
router.post("/verify", isLoggedIn, verifyOrder);
router.post("/cancel", isLoggedIn, cancelOrder);
router.get("/all", isLoggedIn, allPayments);

export default router;
