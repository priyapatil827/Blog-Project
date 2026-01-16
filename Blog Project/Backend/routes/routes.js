import express from "express";
import multer from "multer";
import path from "path"; // <-- imported path for extension handling

// Blog Controllers
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogControllers.js";

// User Controllers
import {
  signUp,
  login,
  logout,
} from "../controllers/userControllers.js";

// OTP Controllers
import {
  sendOtp,
  verifyOtp,
} from "../controllers/otpControllers.js";

const router = express.Router();

/* ================= MULTER SETUP ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blogs");
  },
  filename: (req, file, cb) => {
    // Applied first code's filename logic
    cb(null, "blog-img" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= USER ROUTES ================= */

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

/* ================= OTP ROUTES ================= */

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

/* ================= BLOG ROUTES ================= */

router.post("/blogs", upload.single("image"), createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getSingleBlog);
router.put("/blogs/:id", upload.single("image"), updateBlog);
router.delete("/blogs/:id", deleteBlog);

export default router;
