import { Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome-card">
        <h1>📝 My Blog App</h1>
        <p>
          Share your thoughts, read amazing blogs,  
          and express your ideas with the world ✨
        </p>

        <div className="welcome-buttons">
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
          <Link to="/signup" className="btn-secondary">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
