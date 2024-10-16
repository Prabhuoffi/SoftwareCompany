// src/pages/NotAuthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">403 - Not Authorized</h1>
      <p className="mb-6">You do not have permission to access this page.</p>
      <Link to="/" className="text-purple-500 underline">
        Go to Home
      </Link>
    </div>
  );
};

export default NotAuthorized;
