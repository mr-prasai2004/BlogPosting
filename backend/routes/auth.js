const express = require('express');
const blogController = require('../controllers/blogController');
const authenticateUser = require('../middleware/auth');
const router = express.Router();

// Create blog post (requires authentication)
router.post('/blogs/create', authenticateUser, blogController.createBlog);

// Get all blogs (public)
router.get('/blogs', blogController.getAllBlogs);

// Get blog by ID (public)
router.get('/blogs/:id', blogController.getBlogById);

// Get blogs by user (requires authentication)
router.get('/blogs/user', authenticateUser, blogController.getUserBlogs);

// Update blog post (requires authentication)
router.put('/blogs/:id', authenticateUser, blogController.updateBlog);

// Delete blog post (requires authentication)
router.delete('/blogs/:id', authenticateUser, blogController.deleteBlog);

module.exports = router;
