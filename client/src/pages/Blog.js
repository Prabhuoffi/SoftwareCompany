import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogposts");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 text-black font-sans">
      {/* Header Section */}
      <header className="text-black py-32 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Our Blog
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Stay updated with the latest news, tips, and insights from our team.
        </motion.p>
      </header>

      {/* Blog Posts Section */}
      <section className="py-8 px-8 bg-purple-100 md:px-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * post.id, duration: 0.5 }}
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                  <h2 className="text-2xl font-semibold">{post.title}</h2>
                  <div className="flex items-center text-gray-300 mb-1">
                    <FaCalendarAlt className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-lg mb-4 text-gray-800">{post.summary}</p>
                <a
                  href={post.link}
                  className="text-purple-600 hover:underline flex items-center transition-colors duration-300"
                >
                  Read More <FaExternalLinkAlt className="ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
