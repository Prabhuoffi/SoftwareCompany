const BlogPost = require('../../models/Blog/blogPost');

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  const { title, date, summary, image, link } = req.body;

  try {
    const newBlogPost = new BlogPost({ title, date, summary, image, link });
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a blog post
exports.updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, date, summary, image, link } = req.body;

  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      id,
      { title, date, summary, image, link },
      { new: true, runValidators: true } // returns the updated document and applies validation
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(updatedBlogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    
    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
