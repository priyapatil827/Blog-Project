import { useEffect, useState } from "react";
import { getAllBlogsApi, updateBlogApi } from "../../api/blog.js";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBlog.css";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await getAllBlogsApi(); // ✅ array milta hai
      const blog = res.find((b) => b._id === id);

      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
      }
    } catch (err) {
      console.error("Error fetching blog", err);
      showPopup("error", "Error fetching blog");
    }
  };

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 2500); // auto hide after 2.5s
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateBlogApi(id, { title, content });
      showPopup("success", "Blog Updated Successfully");
      setTimeout(() => navigate("/home"), 2500); // navigate after popup
    } catch (err) {
      console.error("Update error", err);
      showPopup("error", "Error updating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {popup.show && (
        <div className={`popup-overlay ${popup.type}`}>
          <div className="popup-content">{popup.message}</div>
        </div>
      )}

      <form className="edit-blog-form" onSubmit={handleSubmit}>
        <h2>Edit Blog</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog Content"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </>
  );
}
