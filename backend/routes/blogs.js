const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', authMiddleware, blogController.updateBlog);  // Ensure this route exists for updating
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
