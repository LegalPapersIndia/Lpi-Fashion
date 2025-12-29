import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  phonepeOrder,       // ← नया add किया
  phonepeCallback,    // ← optional लेकिन recommended
} from "../controllers/orderController.js";

import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

// ========== USER ROUTES ==========

// COD Order (पहले जैसा ही)
orderRouter.post("/place", authUser, placeOrder);

// PhonePe Payment Initiation (नया route)
orderRouter.post("/phonepe", authUser, phonepeOrder);

// My Orders page के लिए
orderRouter.post("/userorders", authUser, userOrders);

// Optional: PhonePe server-to-server callback (no auth needed, public endpoint)
orderRouter.post("/phonepe-callback", phonepeCallback);

// ========== ADMIN ROUTES ==========

// All orders list for admin panel
orderRouter.post("/list", adminAuth, allOrders);

// Update order status (Shipped, Delivered, etc.)
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;