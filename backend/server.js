import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

connectDB();
connectCloudinary();

// CORS Configuration - Allow ALL origins using *
app.use(
  cors({
    origin: "*", // This allows requests from any domain
    credentials: true, // Important if you're using cookies or auth headers
    optionsSuccessStatus: 200,
  })
);

// If you want even simpler (same effect):
// app.use(cors({ origin: "*" }));

app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});