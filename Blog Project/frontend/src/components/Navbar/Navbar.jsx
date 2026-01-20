import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.log("Server logout failed, continuing local logout");
    } finally {
      localStorage.removeItem("token");

      // 🔥 Dispatch custom event so App.jsx can re-check login state
      window.dispatchEvent(new Event("auth-change"));

      // 🔥 Instant navigate to login
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="navbar">
      <h2>My Blog</h2>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/create">Create Blog</Link>
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>
    </nav>
  );
}
