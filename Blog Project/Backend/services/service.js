import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, // Gmail App Password recommended
  },
});

// Verify transporter (optional but helpful for debugging)
transport.verify((error, success) => {
  if (error) {
    console.log("❌ Transport Error:", error);
  } else {
    console.log("✅ Mail server is ready to send messages");
  }
});

// Send OTP Mail Function
export const sendOtpMail = async (email, otp) => {
  try {
    await transport.sendMail({
      from: `OTP Services <${process.env.EMAIL}>`,
      to: email,
      subject: "Your Secure OTP Verification",
      html: `
      <div style="
          background: linear-gradient(145deg, #FFFBDE, #90D1CA);
          padding: 45px;
          font-family: 'Segoe UI', Tahoma, sans-serif;
          border-radius: 20px;
          text-align: center;
          max-width: 520px;
          margin: auto;
          position: relative;
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
      ">

          <!-- Gradient Border Effect -->
          <div style="
              position: absolute;
              inset: 3px;
              background: #FFFBDE;
              border-radius: 18px;
              z-index: 0;
          "></div>

          <div style="position: relative; z-index: 1;">

              <h1 style="
                  color:#096B68;
                  font-size:30px;
                  margin-bottom:5px;
                  letter-spacing:1px;
              ">
                  🔐 Secure OTP Access
              </h1>

              <p style="
                  font-size:16px;
                  color:#129990;
                  margin-bottom:25px;
              ">
                  Welcome back! Enter this code to continue your secure login.
              </p>

              <!-- OTP Box -->
              <div style="
                  margin:20px auto;
                  font-size:38px;
                  font-weight:800;
                  color:#096B68;
                  letter-spacing:10px;
                  padding:20px 35px;
                  border-radius:15px;
                  background: linear-gradient(135deg, #90D1CA, #FFFBDE);
                  display: inline-block;
                  box-shadow: 
                      0 10px 25px rgba(0,0,0,0.25),
                      inset 0 0 15px rgba(18,153,144,0.5);
                  animation: glow 1.5s infinite alternate;
              ">
                  ${otp}
              </div>

              <p style="
                  font-size:14px;
                  color:#129990;
                  margin-top:15px;
              ">
                  ⏳ This OTP expires in <strong>2 minutes</strong>
              </p>

              <!-- Button -->
              <a href="#" style="
                  display:inline-block;
                  margin-top:30px;
                  background: linear-gradient(135deg, #129990, #096B68);
                  color:white;
                  padding:14px 36px;
                  text-decoration:none;
                  border-radius:30px;
                  font-weight:bold;
                  letter-spacing:1px;
                  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
              ">
                  Verify Securely
              </a>

              <p style="
                  margin-top:35px;
                  font-size:12px;
                  color:#096B68;
              ">
                  If you didn’t request this OTP, you can safely ignore this email.
              </p>
          </div>

          <style>
              @keyframes glow {
                  from {
                      box-shadow: 
                          0 0 15px rgba(18,153,144,0.5),
                          inset 0 0 10px rgba(18,153,144,0.4);
                  }
                  to {
                      box-shadow: 
                          0 0 30px rgba(18,153,144,0.9),
                          inset 0 0 20px rgba(18,153,144,0.7);
                  }
              }
          </style>
      </div>
      `,
    });

    console.log("✅ OTP Mail Sent Successfully to:", email);
    return true;
  } catch (err) {
    console.log("❌ Mail send error:", err);
    return false;
  }
};
