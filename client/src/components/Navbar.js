import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ darkMode, toggleTheme }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const toggleNav = () => setNavOpen(!navOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen);

  const navLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const dropdownLinks = [
    { to: '/careers', label: 'Careers' },
    { to: '/partners', label: 'Partners' },
    { to: '/faq', label: 'FAQ' },
    {to :'/register',label:'Register'},
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setMobileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setNavOpen(false);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [location]);

  const navbarVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md fixed w-full z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src='./logo.png'
            className="w-12 h-12 object-contain rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
            alt="Software Company Logo"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-white hover:text-yellow-300 transition-colors duration-200 ${
                  location.pathname === to ? 'font-semibold text-yellow-300' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className="flex items-center text-white hover:text-yellow-300 transition-colors duration-200 focus:outline-none"
            >
              More <FaChevronDown className={`ml-1 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-20"
                >
                  {dropdownLinks.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Buttons Container */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button for Desktop */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="hidden md:flex items-center justify-center p-2 rounded-md bg-white text-gray-700 hover:bg-gray-300 transition-colors duration-200 focus:outline-none"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

         

          {/* Theme Toggle Button for Mobile */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="md:hidden flex items-center justify-center p-2 rounded-md bg-white text-gray-700 hover:bg-gray-300 transition-colors duration-200 focus:outline-none"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
         {/* Mobile Menu Button */}
          <button
            onClick={toggleNav}
            aria-label={navOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={navOpen}
            className="md:hidden flex items-center justify-center p-2 rounded-md bg-white text-gray-700 hover:bg-gray-300 transition-colors duration-200 focus:outline-none"
          >
            {navOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

        {/* Mobile Menu */}
        {navOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg md:hidden">
            <ul className="flex flex-col">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      location.pathname === to ? 'font-semibold text-yellow-300' : ''
                    }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="relative" ref={mobileDropdownRef}>
                <button
                  onClick={toggleMobileDropdown}
                  aria-haspopup="true"
                  aria-expanded={mobileDropdownOpen}
                  className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                >
                  More <FaChevronDown className={`ml-1 transition-transform duration-200 ${mobileDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileDropdownOpen && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-gray-300 rounded-md shadow-md mt-1"
                    >
                      {dropdownLinks.map(({ to, label }) => (
                        <li key={to}>
                          <Link
                            to={to}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => setMobileDropdownOpen(false)}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
