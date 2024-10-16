import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegFileAlt, FaUser } from "react-icons/fa";
import axios from 'axios';

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    resume: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load job listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === "resume" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/applications', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        position: "",
        resume: null,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 text-black font-sans">
      <header className="text-black py-32 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Join Our Team
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Explore career opportunities at software.in
        </motion.p>
      </header>

      <section className="py-16 px-6 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6">Why Work With Us?</h2>
          <p className="mb-4 text-lg text-gray-700">
            At software.in, we foster a collaborative and innovative environment where your ideas can flourish. We value creativity, commitment, and teamwork.
          </p>
          <p className="mb-4 text-lg text-gray-700">
            Join us in redefining the tech landscape with cutting-edge solutions and exceptional service.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-6 md:px-24 bg-purple-100">
        <motion.h2
          className="text-3xl font-semibold mb-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Current Openings
        </motion.h2>
        {loading ? (
          <p className="text-center text-gray-700">Loading job listings...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20, delay: index * 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              ><p className="text-xl  text-purple-600 font-semibold mb-2">{job.title}</p>
                <p className="text-gray-700 mb-1">{job.description}</p>
                <p className="text-gray-700 mb-1">Location: {job.location}</p>
                <p className="text-gray-600">Experience: {job.experience}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="py-16 px-6 md:px-24 bg-purple-200">
        <motion.h2
          className="text-4xl font-bold mb-10 text-center text-gray-800"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Apply Now
        </motion.h2>
        <div className="flex justify-center">
          {isSubmitted ? (
            <motion.div
              className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded relative max-w-md w-full shadow-md"
              role="alert"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <strong className="font-bold">Thank you!</strong>
              <span className="block sm:inline"> Your application has been submitted.</span>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 w-full max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex items-center">
                <FaUser className="text-gray-600 mr-3 text-2xl" />
                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow border border-gray-300 ml-2 rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-6 flex items-center">
                <FaRegFileAlt className="text-gray-600 mr-3 text-2xl" />
                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow border border-gray-300 ml-2 rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="position">
                  Position
                </label>
                <input
                  className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
                  id="position"
                  type="text"
                  placeholder="Position Applied For"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="resume">
                  Resume
                </label>
                <input
                  className="shadow border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
                  id="resume"
                  type="file"
                  name="resume"
                  accept=".pdf, .doc, .docx"
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={`bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Career;
