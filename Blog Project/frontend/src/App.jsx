import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Welcome from "./pages/Welcome/Welcome";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import EditBlog from "./pages/EditBlog/EditBlog";
import OtpVerify from "./pages/OtpVerify/OtpVerify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // 🔄 Listen to token changes (login/logout)
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" replace /> : <Signup />} />
      <Route path="/verify-otp" element={isLoggedIn ? <Navigate to="/home" replace /> : <OtpVerify />} />

      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
      <Route path="/edit/:id" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
