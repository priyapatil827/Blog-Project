import { otpmodel } from "../models/otpModel.js";
import { sendOtpMail } from "../services/service.js";

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 90000);
  const expiry = new Date(Date.now() + 2 * 60 * 1000);
  try {
    await otpmodel.create({ email, otp, expiry });
    const status = await sendOtpMail(email, otp);
    if (status) {
      res.json({ message: "otp sent successfully !!" });
    } else {
      res.json({ message: "cant sent mail !" });
    }
  } catch (err) {
    res.json({ message: "otp not generated !", err });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const data = await otpmodel.findOne({ email, otp });

  if (!data) {
    return res.json({ message: "otp mismatched !" });
  }

  if (data.expiry < new Date(Date.now())) {
    return res.json({ message: "otp expired !" });
  }

  res.json({ message: "otp verified !" });
  await otpmodel.deleteMany({ email });
};

