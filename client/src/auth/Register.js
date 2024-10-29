import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser, FaUserShield } from 'react-icons/fa'; // Import icons
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success('Registration successful!', {
        position: 'top-right',
      });
      navigate('/login');
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-100 to-pink-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Custom dropdown for role selection */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between"
          >
            {formData.role === 'admin' ? (
              <>
                <FaUserShield className="mr-2" /> Hr 
              </>
            ) : (
              <>
                <FaUser className="mr-2" /> Admin
              </>
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute w-full bg-white border rounded-md shadow-md mt-1">
              <div
                onClick={() => handleRoleChange('user')}
                className="p-2 cursor-pointer flex items-center hover:bg-purple-100"
              >
                <FaUser className="mr-2" /> Admin
              </div>
              <div
                onClick={() => handleRoleChange('admin')}
                className="p-2 cursor-pointer flex items-center hover:bg-purple-100"
              >
                <FaUserShield className="mr-2" /> HR
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-purple-500 text-white p-3 rounded">
          Register
        </button>
        
        {/* Link to Login Page */}
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
};

export default Register;
