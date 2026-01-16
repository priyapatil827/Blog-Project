import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // cookie me JWT expect
    if (!token) return res.status(401).json({ message: "Please login first" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwtsecretkey123");
    const user = await User.findById(decoded.id).select("_id name email");
    if (!user) return res.status(401).json({ message: "Invalid user" });

    req.userId = user._id; // har request me user id attach
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default userMiddleware;
