// src/components/LandingPage.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaLaptopCode, FaMobileAlt, FaCloud, FaLock } from 'react-icons/fa';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import Modal from 'react-modal';
import LandingPageImage from '../assets/landingpage.jpg'; // Import local image

// Import Slick Carousel CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Modal styling
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    background: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

// Bind modal to the app element for accessibility
Modal.setAppElement('#root');

const LandingPage = () => {
  // State for modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
    setModalImage('');
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false, // Hide arrows for a cleaner look
    adaptiveHeight: true,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 },
    },
  };

  // Testimonials data
  const testimonials = [
    {
      quote: 'Exceptional service that exceeded our expectations. Highly recommended!',
      name: 'Jane Doe',
      position: 'CEO, Example Corp',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      quote: 'Innovative solutions improved our processes. A true partner in success.',
      name: 'John Smith',
      position: 'CTO, Tech Solutions',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
    {
      quote: 'Dedicated team that delivers quality work on time. Highly satisfied!',
      name: 'Emily Johnson',
      position: 'Marketing Manager, Creative Agency',
      image: 'https://randomuser.me/api/portraits/women/47.jpg',
    },
    {
      quote: 'Expertise in software development is unmatched. Transformed our ideas!',
      name: 'Michael Brown',
      position: 'Founder, Startup Inc.',
      image: 'https://randomuser.me/api/portraits/men/48.jpg',
    },
  ];

  // Products data
  const products = [
    {
      name: 'Web Development',
      description: 'Responsive and dynamic websites tailored to your business needs.',
      icon: <FaLaptopCode size={40} className="text-pink-500 mx-auto mb-4" />,
    },
    {
      name: 'Mobile Applications',
      description: 'User-friendly mobile apps for iOS and Android platforms.',
      icon: <FaMobileAlt size={40} className="text-pink-500 mx-auto mb-4" />,
    },
    {
      name: 'Cloud Services',
      description: 'Scalable and secure cloud solutions to enhance your operations.',
      icon: <FaCloud size={40} className="text-pink-500 mx-auto mb-4" />,
    },
    {
      name: 'Cybersecurity',
      description: 'Robust security measures to protect your digital assets.',
      icon: <FaLock size={40} className="text-pink-500 mx-auto mb-4" />,
    },
  ];

  // Features data
  const features = [
    {
      title: 'Innovative Solutions',
      description: 'Leveraging the latest technologies to drive your business forward.',
      icon: <FaLaptopCode size={30} className="text-pink-500" />,
    },
    {
      title: 'Expert Team',
      description: 'Dedicated professionals providing top-notch services and support.',
      icon: <FaMobileAlt size={30} className="text-pink-500" />,
    },
    {
      title: 'Customer Focused',
      description: 'Prioritizing client needs to ensure satisfaction and long-term partnerships.',
      icon: <FaCloud size={30} className="text-pink-500" />,
    },
    {
      title: 'Quality Assurance',
      description: 'Commitment to excellence meets the highest standards.',
      icon: <FaLock size={30} className="text-pink-500" />,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 flex flex-col min-h-screen">
      {/* Modal for Product Images */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Product Image"
      >
        <button onClick={closeModal} className="absolute top-2 right-2 text-white text-2xl font-bold focus:outline-none">
          &times;
        </button>
        <img src={modalImage} alt="Product" className="rounded-lg shadow-lg max-w-full max-h-screen" />
      </Modal>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        className="container mx-auto px-4 py-20 flex flex-col-reverse md:flex-row items-center"
        viewport={{ once: true }}
      >
        <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            Transforming Ideas into Reality
          </motion.h1>
          <motion.p className="text-lg text-gray-700 mb-6" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            We provide top-notch solutions to help your business grow. Join us today to experience cutting-edge technology and expert services.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}>
            <Link to="/get-started" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md shadow-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105">
              Get Started <HiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src={LandingPageImage}
            alt="Software Development"
            className="w-3/4 mt-8 h-auto rounded-lg shadow-2xl"
            loading="lazy"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section initial="hidden" whileInView="visible" variants={containerVariants} className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center p-6 border rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <motion.div variants={cardVariants} className="mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto" />
                </motion.div>
                <motion.p variants={cardVariants} className="text-lg italic text-gray-600 mb-2">
                  <FaQuoteLeft className="inline text-pink-500" /> {testimonial.quote}
                </motion.p>
                <motion.h3 variants={cardVariants} className="text-md font-semibold">
                  {testimonial.name}
                </motion.h3>
                <motion.p variants={cardVariants} className="text-sm text-gray-500">{testimonial.position}</motion.p>
              </div>
            ))}
          </Slider>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section initial="hidden" whileInView="visible" variants={containerVariants} className="py-20 bg-gradient-to-r from-blue-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div key={index} variants={cardVariants} className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform duration-300 hover:scale-105">
                {product.icon}
                <h3 className="text-xl font-semibold my-4">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section initial="hidden" whileInView="visible" variants={containerVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} variants={cardVariants} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transition-transform duration-300 hover:scale-105">
                {feature.icon}
                <h3 className="text-xl font-semibold my-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section initial="hidden" whileInView="visible" variants={sectionVariants} className="py-20 bg-gradient-to-r from-pink-300 to-purple-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
        <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-white text-purple-500 rounded-md shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105">
          Contact Us <HiArrowRight className="ml-2" />
        </Link>
      </motion.section>
    </div>
  );
};

export default LandingPage;

