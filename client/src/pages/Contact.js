import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import axios from "axios"; // Import axios

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contactInfo, setContactInfo] = useState({
    location: "",
    phone: "",
    email: ""
  }); // State for contact info

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch contact information from backend
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact-info");
        const { location, phone, email } = response.data;
        setContactInfo({ location, phone, email });
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_USER_ID")
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("There was an error sending your message. Please try again later.");
      });
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 text-black font-sans overflow-hidden">
      <header className="text-black py-32 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          We’re here to assist you. Reach out to us through any of the options below or send us a message using the contact form.
        </motion.p>
      </header>

      <section className="py-16 px-4 md:px-8 bg-purple-100">
        <div className="md:flex bg-purple-400 py-8 text-center justify-around rounded-lg shadow-md mb-16">
          <motion.div
            className="flex flex-col items-center mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaMapMarkerAlt className="text-purple-800 text-3xl mb-4" aria-label="Location" />
            <h3 className="text-2xl font-semibold mb-2">Our Location</h3>
            <p className="text-center text-gray-600">{contactInfo.location}</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaPhoneAlt className="text-purple-800 text-3xl mb-4" aria-label="Phone" />
            <h3 className="text-2xl font-semibold mb-2">Contact Number</h3>
            <p className="text-lg text-gray-600">{contactInfo.phone}</p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FaEnvelope className="text-purple-800 text-3xl mb-4" aria-label="Email" />
            <h3 className="text-2xl font-semibold mb-2">Email Us</h3>
            <p className="text-lg text-gray-600">{contactInfo.email}</p>
          </motion.div>
        </div>

        <div className="md:flex md:space-x-6">
          <motion.div
            className="md:w-1/2 mx-auto"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl text-gray-700 text-center mt-2  font-semibold">Send Us a Message</h2>
            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded relative" role="alert">
                <strong className="font-bold">Thank you!</strong>
                <span className="block sm:inline"> Your message has been sent successfully.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white  shadow-md rounded px-8 pt-6 pb-8">
                <div className="mb-4">
                  <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="name">
                    Your Name
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

                <div className="mb-4">
                  <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="email">
                    Your Email
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

                <div className="mb-4">
                  <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="shadow border border-gray-300 ml-2 rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    className="shadow border border-gray-300 ml-2 rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
                    id="message"
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          <motion.div
            className="md:w-1/2 mx-auto mt-8 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl text-gray-700 text-center font-semibold">Our Location</h2>
            <div className="w-full h-80 mt-4">
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dxxxxx!2d-122.3316393!3d47.5951518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549015eee7c2a0e9%3A0xaaaaaaa!2sYour+Location!5e0!3m2!1sen!2sus!4vxxxxx"
  width="100%"
  height="165%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  title="Google Map"
></iframe>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
