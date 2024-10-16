import React from "react";
import { Link } from "react-router-dom";
import {
  FaInfoCircle,
  FaBriefcase,
  FaUserTie,
  FaEnvelope,
  FaHandshake,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaInstagramSquare,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa"; 
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 to-purple-600 text-black py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="hover:underline flex items-center hover:text-yellow-300 transition">
                  <FaInfoCircle className="mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:underline flex items-center hover:text-yellow-300 transition">
                  <FaBriefcase className="mr-2" /> Services
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:underline flex items-center hover:text-yellow-300 transition">
                  <FaUserTie className="mr-2" /> Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline flex items-center hover:text-yellow-300 transition">
                  <FaEnvelope className="mr-2" /> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:underline flex items-center hover:text-yellow-300 transition">
                  <FaHandshake className="mr-2" /> Partners
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              {[
                { href: "https://www.facebook.com", icon: <FaFacebookSquare />, label: "Facebook" },
                { href: "https://www.twitter.com", icon: <FaTwitterSquare />, label: "Twitter" },
                { href: "https://www.linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" },
                { href: "https://www.instagram.com", icon: <FaInstagramSquare />, label: "Instagram" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-yellow-300 transition transform hover:scale-110"
                  aria-label={social.label}
                  whileHover={{ scale: 1.2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> 123 Main St, City, Country
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" /> +123 456 7890
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> info@example.com
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
