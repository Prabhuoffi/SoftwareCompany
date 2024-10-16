import React from "react";
import { FaLaptopCode, FaMobileAlt, FaCloud, FaDatabase, FaShieldAlt, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const Service = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 flex flex-col min-h-screen">
      {/* Header Section */}
      <header className=" text-black py-32 text-center">
      <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Discover the wide range of services designed to help your business grow and excel.
        </motion.p>
      </header>

      {/* Services Section */}
      <section className="py-20 px-8 md:px-24 bg-purple-100">
        <div className="md:grid grid-cols-3 gap-12">
          {/* Service 1 */}
          <motion.div
            className="text-center mb-12 md:mb-0 p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaLaptopCode className="text-purple-400  text-7xl mb-6 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Web Development</h3>
            <p className="text-base md:text-lg text-gray-700">
              Building responsive, feature-rich websites that provide exceptional user experiences.
            </p>
          </motion.div>

          {/* Service 2 */}
          <motion.div
            className="text-center mb-12 md:mb-0 p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaMobileAlt className="text-purple-400  text-7xl mb-6 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Mobile App Development</h3>
            <p className="text-base md:text-lg text-gray-700">
              Creating cross-platform mobile apps with seamless performance across all devices.
            </p>
          </motion.div>

          {/* Service 3 */}
          <motion.div
            className="text-center mb-12 md:mb-0 p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaCloud className="text-purple-400  text-7xl mb-6 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Cloud Solutions</h3>
            <p className="text-base md:text-lg text-gray-700">
              Offering scalable, secure cloud services tailored to your business needs.
            </p>
          </motion.div>

          {/* Service 4 */}
          <motion.div
            className="text-center mb-12 md:mb-0 p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaDatabase className="text-purple-400  text-7xl mb-6 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Data Management</h3>
            <p className="text-base md:text-lg text-gray-700">
              Ensuring efficient data storage, processing, and security for your business.
            </p>
          </motion.div>

          {/* Service 5 */}
          <motion.div
            className="text-center mb-12 md:mb-0 p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaShieldAlt className="text-purple-400  text-7xl mb-6 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Cybersecurity</h3>
            <p className="text-base md:text-lg text-gray-700">
              Protecting your business from online threats with advanced security measures.
            </p>
          </motion.div>

          {/* Service 6 */}
          <motion.div
            className="text-center p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaLightbulb className="text-purple-400  text-7xl mb-6 mx-auto" />
            <h3 className="text-2xl font-semibold mb-3">Consulting & Innovation</h3>
            <p className="text-base md:text-lg text-gray-700">
              Expert guidance and innovative solutions to keep your business ahead.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Service;
