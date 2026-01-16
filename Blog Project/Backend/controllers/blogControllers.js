import Blog from "../models/blogModel.js";

// CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Build full URL for the image if uploaded
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/blogs/${req.file.filename}`
      : null;

    if (!title || !content)
      return res.status(400).json({ message: "All fields are required" });

    const newBlog = new Blog({
      title,
      content,
      image,
      author: req.userId,
    });

    await newBlog.save();
    return res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET SINGLE BLOG
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    return res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Include image update if file is uploaded
    const updatedData = { title, content };
    if (req.file) {
      updatedData.image = `${req.protocol}://${req.get("host")}/uploads/blogs/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
