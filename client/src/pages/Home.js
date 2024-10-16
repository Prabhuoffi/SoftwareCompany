// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAdmin, logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Job Portal</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
        {isAdmin && (
          <Link to="/admin-dashboard" className="text-green-500 underline">
            Admin Dashboard
          </Link>
        )}
      </div>
      {isAdmin && (
        <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      )}
    </div>
  );
};

export default Home;
