import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";
import axios from "axios";

// Global variables
const deliveryCharges = 10;

// COD Order
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const totalAmount = amount + deliveryCharges;

    const orderData = {
      userId,
      items,
      amount: totalAmount,
      address,
      paymentMethod: "Cash on Delivery",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order Placed Successfully with Cash on Delivery",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// PhonePe Payment (Latest Working Test Mode - Dec 2025)
const phonepeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const totalAmount = amount + deliveryCharges;
    const totalAmountInPaise = Math.round(totalAmount * 100);

    const merchantTransactionId = "TEST" + Date.now() + Math.floor(Math.random() * 1000);

    const payload = {
      merchantId: "PGTESTPAYUAT86",                    // Latest working test ID
      merchantTransactionId: merchantTransactionId,
      merchantUserId: "MUID" + userId,
      amount: totalAmountInPaise,
      redirectUrl: `http://localhost:3000/phonepe-response?txnId=${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: "http://localhost:5000/api/order/phonepe-callback",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");

    const saltKey = "96434309-7796-489d-8924-ab56988a6076";   // Latest working salt
    const saltIndex = 1;

    const stringToHash = base64Payload + "/pg/v1/pay" + saltKey;
    const hash = crypto.createHash("sha256").update(stringToHash).digest("hex");
    const xVerify = hash + "###" + saltIndex;

    const response = await axios.post(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      { request: base64Payload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
          "X-MERCHANT-ID": "PGTESTPAYUAT86",
        },
      }
    );

    if (response.data.success) {
      const paymentUrl = response.data.data.instrumentResponse.redirectInfo.url;

      const orderData = {
        userId,
        items,
        amount: totalAmount,
        address,
        paymentMethod: "PhonePe (Test)",
        payment: false,
        status: "Payment Pending",
        transactionId: merchantTransactionId,
        date: Date.now(),
      };

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      res.json({ success: true, paymentUrl });
    } else {
      res.json({
        success: false,
        message: response.data.message || "PhonePe initiation failed",
      });
    }
  } catch (error) {
    console.error("PhonePe Error:", error.response?.data || error.message);
    res.json({ success: false, message: "Server error during payment" });
  }
};

// PhonePe Callback (Success → Cart clear + Order confirm)
const phonepeCallback = async (req, res) => {
  try {
    const { response } = req.body;

    if (response) {
      const decoded = Buffer.from(response, "base64").toString("utf-8");
      const data = JSON.parse(decoded);

      if (data.success && data.code === "PAYMENT_SUCCESS") {
        const txnId = data.data.merchantTransactionId;

        await orderModel.findOneAndUpdate(
          { transactionId: txnId },
          { payment: true, status: "Order Placed" }
        );

        const userId = data.data.merchantUserId.replace("MUID", "");
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
      }
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Callback Error:", error);
    res.status(500).send("Error");
  }
};

// Admin & User Routes
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    if (status === "Delivered") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
    }

    res.json({ success: true, message: "Status Updated", order: updatedOrder });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  phonepeOrder,
  phonepeCallback,
  allOrders,
  userOrders,
  updateStatus,
};