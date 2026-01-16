import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BlogCard from "../../components/BlogCard/BlogCard";
import { getAllBlogsApi, deleteBlogApi } from "../../api/blog.js";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [popup, setPopup] = useState({ visible: false, message: "", type: "success" });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchBlogs();
  }, [location.state]);

  const fetchBlogs = async () => {
    const res = await getAllBlogsApi();
    setBlogs(res);
  };

  const showPopup = (message, type = "success") => {
    setPopup({ visible: true, message, type });

    setTimeout(() => setPopup({ ...popup, visible: false }), 2500);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlogApi(id);
      fetchBlogs();
      showPopup("Blog Deleted Successfully", "success");
    } catch (err) {
      console.error(err);
      showPopup("Error deleting blog", "error");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <span className="hero-badge">✨ Stories that matter</span>
        <h1>
          Turn Your <span>Thoughts</span> Into Impactful Stories
        </h1>
        <p>
          A creative corner for curious minds.
          Read inspiring blogs, share your voice,
          and grow with a community of writers.
        </p>
      </section>

      {/* FEATURED BLOGS */}
      <section className="featured">
        <h2>Featured Blogs</h2>
        <div className="featured-grid">
          {blogs.slice(0, 4).map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </section>

      {/* ALL BLOGS */}
      <section className="blog-section">
        <h2>Latest from the Community</h2>
        {blogs.length === 0 && (
          <p className="no-blogs">No blogs available. Create one!</p>
        )}
        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>My Blog App</h3>
        <p>Share your thoughts. Inspire the world.</p>
        <span>© {new Date().getFullYear()} My Blog App</span>
      </footer>

      {/* Popup */}
      {popup.visible && (
        <div className={`popup-overlay ${popup.type}`}>
          <div className="popup-content">
            <h3>{popup.message}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
