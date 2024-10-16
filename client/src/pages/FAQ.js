import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";

const FAQ = () => {
  // State to manage the open question
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample FAQ data
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a range of services including web development, mobile application development, cloud solutions, and IT consulting.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact our support team via email at support@dprotech.in or call us at +1 (123) 456-7890.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee for our services. If you are not satisfied, please contact us within 30 days for a full refund.",
    },
    {
      question: "Do you provide training?",
      answer:
        "Yes, we offer training programs for our services and tools. Please contact us for more details on the training schedule and enrollment.",
    },
    // Add more FAQs as needed
  ];

  // Toggle function for opening and closing FAQ answers
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IconContext.Provider value={{ color: "#6B21A8", size: "1.2em" }}>
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 text-black py-24 px-8 md:px-24 font-sans min-h-screen">
        {/* Header Section */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="flex items-center justify-center text-4xl md:text-5xl font-bold mb-4">
            <FaQuestionCircle className="mr-2 text-purple-600" />
            Frequently Asked Questions
          </h1>
         
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
    
            Find answers to the most common questions about our services and policies.
          </motion.p>

        {/* Search Bar */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full p-4 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring focus:ring-purple-500"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      className="p-4 bg-white"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No FAQs match your search.
            </motion.p>
          )}
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default FAQ;
