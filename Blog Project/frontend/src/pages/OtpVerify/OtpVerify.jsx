import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OtpVerify.css";

const OtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Email login page se aayega
  const [email] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  // 🔥 Page open hote hi OTP send karo
  useEffect(() => {
    const sendOtp = async () => {
      try {
        console.log("📨 Sending OTP to:", email);

        const res = await fetch("http://localhost:4000/api/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        console.log("📩 Send OTP response:", data);

        setPopup({ show: true, message: "📩 " + data.message, type: "info" });
        setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);

      } catch (err) {
        console.log("❌ Send OTP error:", err);
        setPopup({ show: true, message: "❌ OTP send failed", type: "error" });
        setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
      }
    };

    if (email) sendOtp();
    else {
      setPopup({ show: true, message: "❌ Email not found. Please login again.", type: "error" });
      setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
    }
  }, [email]);

  // 🔐 VERIFY OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup({ show: false, message: "", type: "" });

    try {
      console.log("🔐 Verifying OTP for:", email);

      const res = await fetch("http://localhost:4000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      console.log("✅ Verify response:", data);

      if (data.message === "otp verified !") {
        localStorage.setItem("token", "verified");
        window.dispatchEvent(new Event("auth-change"));

        setPopup({ show: true, message: "✅ OTP Verified! Redirecting...", type: "success" });

        // popup show duration + navigate
        setTimeout(() => {
          setPopup({ show: false, message: "", type: "" });
          navigate("/home", { replace: true });
        }, 2000);

      } else {
        setPopup({ show: true, message: "❌ " + data.message, type: "error" });
        setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
      }

    } catch (err) {
      console.log("❌ Verify error:", err);
      setPopup({ show: true, message: "❌ Server error", type: "error" });
      setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      {/* 🔔 Popup */}
      {popup.show && (
        <div className={`otp-popup ${popup.type}`}>
          {popup.message}
        </div>
      )}

      <form className="otp-card" onSubmit={handleSubmit}>
        <h2>OTP Verification</h2>

        <input type="email" value={email} disabled />

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;
  