import { useState } from "react";
import { signUp } from "../../api/auth.js";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Popup state
  const [popup, setPopup] = useState({ visible: false, message: "", type: "success" });

  const navigate = useNavigate();

  const showPopup = (message, type = "success") => {
    setPopup({ visible: true, message, type });
    setTimeout(() => setPopup({ ...popup, visible: false }), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp({ name, email, password });
      setLoading(false);
      showPopup("Account created successfully!", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setLoading(false);
      showPopup("User already exists. Please login.", "error");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Signup ✨</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="login-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>

      {/* Popup */}
      {popup.visible && (
        <div className={`popup-overlay ${popup.type}`}>
          <div className="popup-content">
            {popup.type === "success" ? (
              <span style={{ marginRight: "8px" }}>✅</span>
            ) : (
              <span style={{ marginRight: "8px" }}>❌</span>
            )}
            {popup.message}
          </div>
        </div>
      )}
    </div>
  );
}
