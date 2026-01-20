# 📝 Full Stack Blog Application (Frontend + Backend)

Welcome to the **Blog Application** 🚀 — a modern full-stack project built using **React (Frontend)** and **Node.js + Express + MongoDB (Backend)**. This app allows users to **sign up, log in, create, edit, delete, and view blogs with images** in a clean and user-friendly interface.

---

## 🌟 Frontend Overview

The frontend is built using **React + Vite** with a **component-based folder structure** for scalability and clean code organization.

### 📁 Folder Structure

```
src/
 ├── assets/         # Images, icons, and static files
 ├── components/    # Reusable UI components
 │   ├── BlogCard/  # Blog preview cards
 │   ├── BlogDetails/ # Single blog view
 │   ├── Footer/   # Footer section
 │   └── Navbar/  # Navigation bar
 ├── pages/        # Application pages
 │   ├── CreateBlog/ # Create new blog
 │   ├── EditBlog/   # Edit blog
 │   ├── Home/       # Blog feed
 │   ├── Login/     # Login page
 │   ├── Signup/    # Register page
 |   ├── OtpVerify/ # otp verification
 │   └── Welcome/  # Landing page
 ├── App.jsx       # Main routing file
 ├── main.jsx     # Entry point
 └── index.css    # Global styles
```

---

## 🎯 Features

✨ **User Authentication**

* Sign Up & Login using JWT 🔐
* Secure password hashing with bcrypt

📝 **Blog Management**

* Create blog with image upload 📸
* Edit your own blogs ✏️
* Delete blogs 🗑️
* View all blogs in a beautiful card layout 📚

📨 **OTP System**

* Email OTP verification for enhanced security 📩

🎨 **UI & UX**

* Clean responsive layout 📱💻
* Component-based design
* Simple & developer-friendly styling

---

## ⚙️ Tech Stack

### 🖥 Frontend

* React.js ⚛️
* Vite ⚡
* CSS / Bootstrap 🎨
* React Router DOM 🔀

### 🌐 Backend

* Node.js 🟢
* Express.js 🚂
* MongoDB 🍃
* Mongoose 📦
* JWT Authentication 🔐
* Multer (Image Upload) 📸
* Nodemailer (OTP Email) 📧

---

## 🚀 How to Run Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on:
👉 **[http://localhost:5173](http://localhost:5173)**

---

🎥 Project Demo Video

Watch the complete working demo of this Blog Application here 👇

▶️ Demo Video:




https://github.com/user-attachments/assets/cd427a2b-e024-4584-9bb1-d087e35b7248






---

## 🖼 Screens Preview

🔹 **Welcome Page** — Clean landing screen with navigation

🔹 **Signup/Login Page** — Secure authentication

🔹 **Home Page** — All blogs displayed in cards

🔹 **Create Blog Page** — Add blogs with image upload

🔹 **Edit Blog Page** — Update blog content easily

---

## 🛠 Developer Notes

💡 This project follows a **modular structure** making it easy to scale and maintain.

📦 API is connected using `fetch` with credentials support for cookies and JWT.

🔒 Protected routes ensure only logged-in users can create, edit, or delete blogs.

---

## 👨‍💻 Author

**Priya Patil**

If you liked this project, don’t forget to ⭐ the repo and share it! 🚀✨



