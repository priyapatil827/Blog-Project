import mongoose from "mongoose";
const otpschema = new mongoose.Schema(
  {
    email: String,
    otp: Number,
    expiry: Date,
  },
  { timestamps: true }
);
export const otpmodel = mongoose.model("otps", otpschema);
