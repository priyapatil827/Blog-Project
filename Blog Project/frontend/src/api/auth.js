import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// ================= USER APIs =================

// SIGNUP – public
export const signUp = async (userData) => {
  try { 
    const res = await API.post("/signup", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Signup failed" };
  }
};

// LOGIN – public
export const login = async (email, password) => {
  try {
    const res = await API.post("/login", { email, password });

    // Store JWT token in localStorage
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

// LOGOUT – protected (optional, mostly client-side)
export const logout = async () => {
  try {
    localStorage.removeItem("token"); // remove JWT from storage
    const res = await API.post("/logout");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Logout failed" };
  }
};

// GET PROFILE – protected
export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not logged in");

    const res = await API.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetching profile failed" };
  }
};
