const Blog = require('../models/blogModel');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newBlog = await Blog.create(title, content, userId);

    res.status(201).json({
      success: true,
      data: newBlog
    });
  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const blogs = await Blog.getAll(limit, offset);

    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.getById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update blog post
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogId = req.params.id;  // Get the blog ID from the URL parameter
    const userId = req.user.id;    // Get the user ID from the authentication middleware

    console.log(`Updating blog with ID: ${blogId}`);

    let blog = await Blog.getById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Ensure user owns the blog
    if (blog.user_id !== userId) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    blog = await Blog.update(blogId, userId, { title, content });

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete blog post
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    let blog = await Blog.getById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Ensure user owns the blog
    if (blog.user_id !== userId) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    await Blog.delete(blogId, userId);

    res.json({
      success: true,
      message: 'Blog removed'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
