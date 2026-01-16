import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // ✅ Make sure this is at the very top

// ------------------ Debug check ------------------
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS ? "SET" : "NOT SET");
// ------------------------------------------------

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // 16-char Gmail App Password
  },
});

export const sendotpmail = async (email, otp) => {
  try {
    await transport.sendMail({
      from: `"OTP Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}. It will expire in 2 minutes!`,
    });

    console.log("✅ OTP sent to:", email);
    return true;
  } catch (err) {
    console.error("❌ Mail error:", err); // full error print karo
    return false;
  }
};
