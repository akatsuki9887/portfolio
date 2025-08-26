import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-dark dark:text-light mb-8">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:w-full"
          >
            <img
              src="/about-photo.jpg"
              alt="Yuvraj Singh, Full-Stack Developer"
              className="w-full max-w-md mx-auto rounded-xl2 shadow-soft object-cover"
            />
          </motion.div>

          {/* Right: Bio + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-full"
          >
            <p className="text-lg text-dark/80 dark:text-light/80 leading-relaxed mb-4">
              I'm Yuvraj Singh, a Full-Stack Developer from Asansol, India. I specialize in building clean, scalable web applications using <strong>Java</strong>, <strong>React</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>. I love turning ideas into fast, reliable products and thrive on solving real-world problems through code.
            </p>
            <p className="text-sm text-dark/70 dark:text-light/70 mb-6">Fun fact: I enjoy solving LeetCode challenges in my free time and exploring new tech trends.</p>
            <h3 className="text-2xl font-semibold text-primary dark:text-[#06B6D4] mb-4">My Journey</h3>
            <ul className="space-y-4">
              {[
                {
                  year: '2023',
                  title: 'Completed B.Tech in CSE',
                  desc: 'Graduated with a focus on software engineering from [Your College].',
                },
                {
                  year: '2024',
                  title: 'Built 10+ Mini Projects',
                  desc: 'Developed web apps using MERN stack to hone my skills.',
                },
                {
                  year: '2025',
                  title: 'Contributed to Open Source',
                  desc: 'Started contributing to GitHub repositories and learning collaborative development.',
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start"
                  role="listitem"
                  aria-label={`${item.year}: ${item.title}`}
                >
                  <span className="w-2 h-2 bg-primary dark:bg-[#06B6D4] rounded-full mt-2 mr-4"></span>
                  <div>
                    <p className="font-medium text-dark dark:text-light">{item.title}</p>
                    <p className="text-sm text-dark/70 dark:text-light/70">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Highlights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'Focus', value: 'Java • React' },
            { label: 'Projects', value: '10+ Mini • 2 Major' },
            { label: 'Strength', value: 'Clean UI & APIs' },
            { label: 'Location', value: 'Asansol, India' },
          ].map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#1F2937] p-4 rounded-xl2 shadow-soft"
            >
              <p className="text-sm text-dark/60 dark:text-light/60">{card.label}</p>
              <p className="font-semibold text-dark dark:text-light">{card.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;