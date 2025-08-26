import React from 'react';
import { motion } from 'framer-motion';

const Chip = ({ children }) => (
  <motion.span
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
    className="bg-light dark:bg-[#1F2937] text-dark dark:text-light px-3 py-1 rounded-full text-sm font-medium border border-dark/10 dark:border-light/10"
  >
    {children}
  </motion.span>
);

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute right-[-50px] top-[-50px] w-96 h-96 rounded-full bg-accent/20 dark:bg-[#0891B2]/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute left-[-50px] bottom-[-50px] w-96 h-96 rounded-full bg-primary/20 dark:bg-[#1E40AF]/20 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <p className="text-sm uppercase tracking-wider text-dark/60 dark:text-light/60 mb-2">
            Full-Stack Developer
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-light">
            Hi, I’m Yuvraj Singh
          </h1>
          <p className="text-lg text-dark/80 dark:text-light/80 mt-4">
            I build clean, scalable web apps with <strong>Java</strong>, <strong>React</strong>, and{' '}
            <strong>Node.js</strong>.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
            <Chip>Java</Chip>
            <Chip>React</Chip>
            <Chip>Node.js</Chip>
            <Chip>MongoDB</Chip>
          </div>
          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <a
                href="#projects"
                className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#06B6D4]"
              >
                View Projects
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <a
                href="#contact"
                className="btn-outline focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#06B6D4]"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex justify-center"
        >
          <motion.img
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
            src="/my-photo.jpg"
            alt="Yuvraj Singh, Full-Stack Developer"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover ring-4 ring-white dark:ring-[#1F2937] shadow-soft"
          />
          <p className="text-center text-sm text-dark/60 dark:text-light/60 mt-4">
            10+ mini projects • 2 major builds
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;