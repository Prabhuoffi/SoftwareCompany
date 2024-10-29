import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing React Icons

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', date: '', summary: '', image: '', link: '' });
  const [editBlogId, setEditBlogId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all blog posts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogposts');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchBlogs();
  }, []);

  // Create a new blog post
  const createBlogPost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/blogposts', newBlog);
      setBlogs([...blogs, response.data]);
      setNewBlog({ title: '', date: '', summary: '', image: '', link: '' }); // Reset form
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  // Delete a blog post
  const deleteBlogPost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogposts/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  // Set the blog to be edited
  const handleEditClick = (blog) => {
    setIsEditing(true);
    setEditBlogId(blog._id);
    setNewBlog(blog); // Pre-fill the form with blog details
  };

  // Update a blog post
  const updateBlogPost = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/blogposts/${editBlogId}`, newBlog);
      setBlogs(blogs.map((blog) => (blog._id === editBlogId ? response.data : blog)));
      setNewBlog({ title: '', date: '', summary: '', image: '', link: '' }); // Reset form
      setIsEditing(false);
      setEditBlogId(null);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Blog Management</h1>

      {/* Blog Post Form */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4">{isEditing ? 'Edit Blog Post' : 'Create a New Blog Post'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditing ? updateBlogPost() : createBlogPost();
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newBlog.title}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={newBlog.date}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            name="summary"
            placeholder="Summary"
            value={newBlog.summary}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          ></textarea>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newBlog.image}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="link"
            placeholder="Link URL"
            value={newBlog.link}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
            {isEditing ? 'Update Blog Post' : 'Create Blog Post'}
          </button>
        </form>
      </div>

      {/* Blog Posts Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
              <p className="text-sm text-gray-600 mb-2">Published on {blog.date}</p>
              <p className="text-gray-700 mb-6">{blog.summary}</p>
              <div className="flex justify-between">
                <a href={blog.link} className="text-blue-500 hover:underline">
                  Read More
                </a>
                <div className="space-x-2 flex">
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="text-blue-500 hover:text-blue-600 flex items-center space-x-1"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteBlogPost(blog._id)}
                    className="text-red-500 hover:text-red-600 flex items-center space-x-1"
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
