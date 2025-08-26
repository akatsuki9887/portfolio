import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-dark/10 dark:border-light/10 bg-light dark:bg-[#1F2937]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container py-6 text-sm text-dark/70 dark:text-light/70 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div>&copy; {new Date().getFullYear()} Yuvraj Singh. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] transition"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://github.com/akatsuki9887"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] transition"
            aria-label="GitHub profile"
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://x.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] transition"
            aria-label="X profile"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </motion.a>
        </div>
        <div>
          Built with ❤️ using <span className="font-medium text-dark dark:text-light">React</span> &{' '}
          <span className="font-medium text-dark dark:text-light">Tailwind</span>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;