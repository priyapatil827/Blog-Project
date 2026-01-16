import { useState } from "react";
import { createBlogApi } from "../../api/blog.js";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Popup state
  const [popup, setPopup] = useState({
    visible: false,
    message: "",
    type: "success", // success | error | warning
  });

  const showPopup = (message, type = "success") => {
    setPopup({ visible: true, message, type });

    // Auto-close after 3 seconds
    setTimeout(() => setPopup({ ...popup, visible: false }), 3000);
  };

  const submitBlog = async () => {
    if (!form.title || !form.content) {
      return showPopup("Title & Content are required!", "warning");
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("content", form.content);
    if (image) fd.append("image", image);

    setLoading(true);
    try {
      const res = await createBlogApi(fd);
      setLoading(false);

      if (res?.message === "Blog created") {
        showPopup("Blog Created Successfully!", "success");
        setTimeout(() => navigate("/home"), 1500); // redirect after popup
      } else {
        showPopup(res?.message || "Failed to create blog", "error");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      showPopup("Error creating blog", "error");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  return (
    <div className="create-blog-container">
      <h2>Create Blog</h2>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" />
        </div>
      )}

      <button
        onClick={submitBlog}
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>

      {/* Universal Popup */}
      {popup.visible && (
        <div className={`popup-overlay ${popup.type}`}>
          <div className="popup-content">
            <h3>{popup.message}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
