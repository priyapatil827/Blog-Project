import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OtpVerify.css";

const OtpVerify = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.message === "otp verified !") {
        setMessage("✅ OTP Verified Successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Server error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-card" onSubmit={handleSubmit}>
        <h2>OTP Verification</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          required
        />

        <button disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {message && <p className="otp-message">{message}</p>}
      </form>
    </div>
  );
};

export default OtpVerify;
