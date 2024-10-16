import React from "react";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Optional for animations

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Understanding the MERN Stack",
    date: "October 1, 2024",
    summary:
      "Dive into the MERN stack and learn how to build scalable and robust web applications using MongoDB, Express, React, and Node.js.",
    image: "https://deadsimplechat.com/blog/content/images/size/w2000/2023/09/mern-stack.png",
    link: "/blog/mern-stack",
  },
  {
    id: 2,
    title: "10 Tips for Effective Web Development",
    date: "September 15, 2024",
    summary:
      "Enhance your web development skills with these 10 essential tips that will help you create better websites and applications.",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20231205165904/web-development-image.webp",
    link: "/blog/web-development-tips",
  },
  {
    id: 3,
    title: "The Future of Cloud Computing",
    date: "August 30, 2024",
    summary:
      "Explore the latest trends in cloud computing and how they are shaping the future of technology and business.",
    image: "https://images.tmcnet.com/tmc/misc/articles/image/2024-oct/3424762049-AdobeStock_607869709_cloud_infrastructure_technologies_supersize_1200x630.jpeg",
    link: "/blog/cloud-computing-future",
  },
  {
    id: 4,
    title: "Emerging Technologies in AI",
    date: "September 20, 2024",
    summary:
      "Discover the latest breakthroughs in artificial intelligence and their implications for various industries.",
    image: "https://academy.qualcomm.com/content/dam/qcomm-qwang/courses/learning---individuals/woman-on-laptop-with-image-of-brain.jpg",
    link: "/blog/emerging-ai-technologies",
  },
  {
    id: 5,
    title: "Web Accessibility: Best Practices",
    date: "October 5, 2024",
    summary:
      "Learn how to make your websites accessible to everyone by following essential web accessibility guidelines.",
    image: "https://media.istockphoto.com/id/1169668297/photo/network-security-concept-cyber-protection-anti-virus-software.jpg?s=2048x2048&w=is&k=20&c=U6VPc_IBUBEGjCr1K1Y3PhgrU1tzv_yHnh38ftHHXv0=",
    link: "/blog/web-accessibility",
  },
];

const Blog = () => {
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
          {blogPosts.map((post) => (
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
