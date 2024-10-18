import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://server-production-8575.up.railway.app/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role); // Store the user role

      // Redirect based on role
      if (res.data.role === 'admin') {
        navigate('/admin'); // Redirect admins to Admin Dashboard
      } else if (res.data.role === 'user') {
        navigate('/admin'); // Redirect users to Home Page
      }
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-purple-500 text-white p-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
