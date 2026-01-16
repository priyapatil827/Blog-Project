const BASE_URL = "http://localhost:4000/api";

// Create Blog
export const createBlogApi = async (formData) => {
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

// Get All Blogs
export const getAllBlogsApi = async () => {
  const res = await fetch(`${BASE_URL}/blogs`);
  return res.json();
};

// Get Blog By ID
export const getBlogByIdApi = async (id) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`);
  return res.json();
};

// Update Blog
export const updateBlogApi = async (id, data) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// Delete Blog
export const deleteBlogApi = async (id) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
