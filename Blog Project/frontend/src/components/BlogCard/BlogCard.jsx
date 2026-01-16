import React, { useState } from "react";
import "./BlogCard.css";

export default function BlogCard({ blog, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false); // modal open state

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="blog-card" onClick={openModal}>
        {blog.image && (
          <img src={blog.image} alt={blog.title} className="blog-image" />
        )}
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-content">
          {blog.content.length > 100
            ? blog.content.slice(0, 100) + "..."
            : blog.content}
        </p>
      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            {blog.image && (
              <img src={blog.image} alt={blog.title} className="modal-image" />
            )}
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>

            <div className="blog-actions">
              <button className="edit-btn" onClick={() => onEdit(blog._id)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(blog._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
