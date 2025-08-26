import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../App';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' },
  ];

  // Handle scroll for shadow and active link highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Navbar shadow
      const nav = document.querySelector('nav');
      if (window.scrollY > 0) {
        nav.classList.add('shadow-lg');
      } else {
        nav.classList.remove('shadow-lg');
      }

      // Active link highlighting
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('nav a');
      let current = '';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 80) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach((link) => {
        link.classList.remove('text-primary', 'dark:text-[#06B6D4]', 'font-semibold');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('text-primary', 'dark:text-[#06B6D4]', 'font-semibold');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#1F2937] shadow-soft p-4 transition-shadow duration-200">
      <div className="container flex items-center justify-between">
        <div className="text-xl font-bold">
          <a href="#hero" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-primary dark:bg-[#1E40AF] text-white flex items-center justify-center font-bold"
            >
              YS
            </motion.div>
            <span className="hidden md:inline text-dark dark:text-light">Yuvraj Singh</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex space-x-6">
            {sections.map((section) => (
              <motion.li
                key={section.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={`#${section.id}`}
                  className="hover:underline hover:text-accent dark:hover:text-[#06B6D4] transition-smooth text-dark dark:text-light"
                >
                  {section.name}
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="hidden md:block btn-theme"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>

          <a
            href="/my-cv.pdf"
            download
            className="hidden md:block btn-primary"
          >
            Download Resume
          </a>

          <button
            className="md:hidden text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-[#06B6D4]/40"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-[#1F2937] shadow-soft mt-4 p-4 rounded-xl2"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="flex flex-col space-y-4">
              {sections.map((section) => (
                <motion.li
                  key={section.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={`#${section.id}`}
                    className="block hover:underline hover:text-accent dark:hover:text-[#06B6D4] transition-smooth text-dark dark:text-light"
                    onClick={() => setIsOpen(false)}
                  >
                    {section.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDarkMode(!darkMode);
                setIsOpen(false);
              }}
              className="mt-4 btn-theme-mobile"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>
            <a
              href="/my-cv.pdf"
              download
              className="block mt-4 btn-primary"
              onClick={() => setIsOpen(false)}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;