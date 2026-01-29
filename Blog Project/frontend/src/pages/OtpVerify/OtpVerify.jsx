import { useState, useEffect, useRef } from "react";
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

  // ⏳ TIMER STATES
  const [timeLeft, setTimeLeft] = useState(120); // 2 min = 120 sec
  const timerRef = useRef(null);

  // 📩 SEND OTP FUNCTION
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

      // 🔁 Reset Timer
      setTimeLeft(120);
      if (timerRef.current) clearInterval(timerRef.current);
      startTimer();
    } catch (err) {
      console.log("❌ Send OTP error:", err);
      setPopup({ show: true, message: "❌ OTP send failed", type: "error" });
      setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
    }
  };

  // ⏳ START TIMER
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 🔥 Page load par OTP bhejo
  useEffect(() => {
    if (email) {
      sendOtp();
    } else {
      setPopup({
        show: true,
        message: "❌ Email not found. Please login again.",
        type: "error",
      });
      setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [email]);

  // 🔐 VERIFY OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (timeLeft === 0) {
      setPopup({
        show: true,
        message: "⏳ OTP expired. Please resend OTP.",
        type: "error",
      });
      setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
      return;
    }

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

        setPopup({
          show: true,
          message: "✅ OTP Verified! Redirecting...",
          type: "success",
        });

        setTimeout(() => {
          setPopup({ show: false, message: "", type: "" });
          navigate("/home", { replace: true });
        }, 2000);
      } else {
        setPopup({
          show: true,
          message: "❌ " + data.message,
          type: "error",
        });
        setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
      }
    } catch (err) {
      console.log("❌ Verify error:", err);
      setPopup({
        show: true,
        message: "❌ Server error",
        type: "error",
      });
      setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
    } finally {
      setLoading(false);
    }
  };

  // 🕒 FORMAT TIME
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
          disabled={timeLeft === 0}
          required
        />

        {/* ⏳ TIMER UI */}
        <div
          className={`otp-timer ${timeLeft <= 30 ? "danger" : ""}`}
        >
          ⏳ OTP expires in: <strong>{formatTime()}</strong>
        </div>

        <button type="submit" disabled={loading || timeLeft === 0}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* 🔁 RESEND */}
        {timeLeft === 0 && (
          <button
            type="button"
            className="resend-btn"
            onClick={sendOtp}
          >
            🔁 Resend OTP
          </button>
        )}
      </form>
    </div>
  );
};

export default OtpVerify;
