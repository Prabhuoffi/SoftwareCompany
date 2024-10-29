const express = require('express');
const router = express.Router();
const blogPostController = require('../../controllers/Blog/blogPostController');

// GET all blog posts
router.get('/', blogPostController.getAllBlogPosts);

// POST a new blog post
router.post('/', blogPostController.createBlogPost);

//update a post

router.put('/:id', blogPostController.updateBlogPost);

// DELETE a blog post
router.delete('/:id', blogPostController.deleteBlogPost);

module.exports = router;
