import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import router from "./routes/routes.js";

// ✅ ADD THIS
import { sendOtp, verifyOtp } from "./controllers/otpControllers.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads/blogs", express.static("uploads/blogs"));

app.use(
  cors({
    origin: "http://localhost:5173", // frontend port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use("/api", router);

// ✅ OTP ROUTES (ONLY THIS PART ADDED)
app.post("/otp/send", sendOtp);
app.post("/otp/verify", verifyOtp);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
