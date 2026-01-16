import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/auth.js";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // popup state
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // success popup
      setPopup({
        show: true,
        message: "Login successful 🎉",
        type: "success",
      });

      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (err) {
      setPopup({
        show: true,
        message: err.response?.data?.message || "Login failed ❌",
        type: "error",
      });
    } finally {
      setLoading(false);

      // auto hide popup
      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
      }, 2500);
    }
  };

  return (
    <div className="login-container">
      {/* POPUP */}
      {popup.show && (
        <div className={`popup ${popup.type}`}>
          {popup.message}
        </div>
      )}

      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="signup-link">
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
