// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg p-4 flex justify-between items-center">
      <div className="text-3xl font-extrabold text-white tracking-wide">
        Dashboard
      </div>
      <div className="flex items-center space-x-6">
        {/* Replace Admin Name with User Icon */}
        <FaUserCircle className="text-white text-2xl" />
        <Link
          to="/"
          className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out"
        >
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;
