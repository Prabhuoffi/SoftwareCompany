import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex items-center justify-center h-screen  bg-gradient-to-r from-purple-100 to-pink-100">
      <div className="text-center p-10 bg-gray-50 bg-opacity-70 rounded-lg shadow-lg animate-fade-in">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 ">
          Welcome to the Admin Dashboard
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Manage all your services, content, and users from here.
        </p>
        <button className="px-6 py-3 bg-purple-400 text-white font-semibold rounded-full hover:bg-purple-500 transition transform hover:scale-105 duration-300 shadow-md">
          Let's Edit
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
