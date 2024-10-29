import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaExternalLinkAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/partners");
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
        setError("Unable to load partner information.");
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <IconContext.Provider value={{ color: "#6B21A8", size: "1.5em" }}>
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 text-black font-sans">
        <header className="text-black py-32 text-center">
          <motion.h1
            className="flex items-center justify-center text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <FaHandshake className="mr-4" />
            Our Partners
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            We are proud to partner with some of the leading companies in the industry. 
            These partnerships reflect our commitment to excellence and innovation.
          </motion.p>
        </header>

        {/* Error message */}
        {error && (
          <div className="text-center text-red-500 font-semibold py-4">
            {error}
          </div>
        )}

        {/* Loading message */}
        {loading && (
          <div className="text-center text-gray-500 font-semibold py-4">
            Loading partners...
          </div>
        )}

        {/* Testimonials */}
        <section className="py-12">
          <motion.h2
            className="flex items-center justify-center text-3xl text-center font-semibold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <FaHandshake className="mr-2" />
            Partner Testimonials
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {partners.map((partner) => (
              <motion.div
                key={partner._id} // Use unique _id here
                className="bg-purple-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
                variants={{
                  hidden: { opacity: 1 },
                  visible: { opacity: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <p className="text-lg italic mb-4">"{partner.testimonial}"</p>
                <h3 className="text-purple-600 font-bold">- {partner.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Partners Grid */}
        <section className="py-12">
          <motion.h2
            className="flex items-center justify-center text-3xl text-center font-semibold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <FaHandshake className="mr-2" />
            Our Esteemed Partners
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 py-9 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {partners.map((partner) => (
              <motion.div
                key={partner._id} // Use unique _id here
                className="relative bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="overflow-hidden rounded-lg">
                  <motion.img
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    loading="lazy"
                    className="h-20 mx-auto mb-4 object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{partner.name}</h2>
                <p className="text-gray-700 mb-4">{partner.description}</p>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${partner.name}'s website`}
                  className="flex items-center justify-center text-purple-600 hover:underline font-semibold"
                >
                  Visit Website <FaExternalLinkAlt className="ml-2" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </IconContext.Provider>
  );
};

export default Partners;
