import express from "express";
import {
  listProducts,
  removeProduct,
  singleProduct,
  addProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = express.Router();

// Add new product
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// Update existing product (same multer config as add)
productRouter.post(
  "/update",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);

// Remove product
productRouter.post("/remove", adminAuth, removeProduct);

// Get single product details
productRouter.post("/single", adminAuth, singleProduct);

// List all products (no auth needed if public, but you can add adminAuth if required)
productRouter.get("/list", listProducts);

// Optional: If you want a public list without auth, keep as is.
// If only admins should see the list, uncomment the line below:
// productRouter.get("/list", adminAuth, listProducts);

export default productRouter;