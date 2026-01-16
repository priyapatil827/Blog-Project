import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // simple check


  const handleLogout = () => {
    fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include", // important for cookies
    }).then(() => {
      // ✅ Local state / storage clear
      localStorage.removeItem("token");
      navigate("/login");
    });
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
