import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaQuoteLeft, FaList, FaBlog, FaQuestionCircle, FaInfoCircle, FaHandshake,FaPhone } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-purple-700 via-indigo-600 to-blue-600 text-white min-h-screen">
      <div className="p-4 text-3xl font-bold tracking-wide text-center">
        Admin Dashboard
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-2">
            <Link to="/admin-dashboard/services" className="flex items-center py-2.5 px-4 hover:bg-purple-600 transition-colors rounded-lg">
              <FaCog className="mr-3" /> LandingPage Services
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin-dashboard/testimonials" className="flex items-center py-2.5 px-4 hover:bg-purple-600 transition-colors rounded-lg">
              <FaQuoteLeft className="mr-3" /> LandingPage Testimonials
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin-dashboard/feature" className="flex items-center py-2.5 px-4 hover:bg-purple-600 transition-colors rounded-lg">
              <FaList className="mr-3" /> LandingPage Features
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin-dashboard/blog" className="flex items-center py-2.5 px-4 hover:bg-purple-600 transition-colors rounded-lg">
              <FaBlog className="mr-3" /> Manage Blog
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin-dashboard/faq" className="flex items-center py-2.5 px-4 hover:bg-purple-600 transition-colors rounded-lg">
              <FaQuestionCircle className="mr-3" /> Manage FAQ
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin-dashboard/about" className="flex items-center py-2.5 px-4 hover:bg-purple-600 transition-colors rounded-lg">
              <FaInfoCircle className="mr-3" /> Manage About Us
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin-dashboard/partner" className="flex items-center py-2.5 px-4 hover:bg-purple-600 transition-colors rounded-lg">
              <FaHandshake className="mr-3" /> Manage Partners
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin-dashboard/contact" className="flex items-center py-2.5 px-4 hover:bg-purple-600 transition-colors rounded-lg">
              <FaPhone className="mr-3" /> Contact Info
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
