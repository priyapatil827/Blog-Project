import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BlogDetails.css";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {blog.image && (
        <img src={blog.image} alt={blog.title} />
      )}

      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}
