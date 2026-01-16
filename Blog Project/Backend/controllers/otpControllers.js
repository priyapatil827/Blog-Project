import { otpmodel } from "../models/otpModel.js";
import { sendotpmail } from "../services/service.js";
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiry = new Date(Date.now() + 2 * 60 * 1000);

  try {
    await otpmodel.deleteMany({ email }); // remove old OTPs

    await otpmodel.create({ email, otp, expiry });

    const status = await sendotpmail(email, otp);

    if (status) {
      return res.json({ message: "OTP sent successfully" });
    }

    res.status(500).json({ message: "Cannot send mail" });
  } catch (err) {
    res.status(500).json({ message: "OTP not generated", error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const data = await otpmodel.findOne({ email, otp });

  if (!data) {
    return res.status(400).json({ message: "OTP mismatch" });
  }

  if (data.expiry < new Date()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  await otpmodel.deleteMany({ email }); // important

  res.json({ message: "OTP verified!" });
};
