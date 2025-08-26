import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import * as Icons from 'react-icons/fa';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get('https://portfolio-backend-82ts.onrender.com/api/skills')
      .then((res) => setSkills(res.data))
      .catch((err) => console.error('Error fetching skills:', err));
  }, []);

  // Dynamically render icon based on icon name
  const renderIcon = (iconName, skillName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? (
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <IconComponent
          size={36}
          className="text-primary dark:text-[#06B6D4]"
          aria-label={`${skillName} icon`}
        />
      </motion.div>
    ) : (
      <span className="text-sm text-dark dark:text-light">?</span>
    );
  };

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  // Animation variants for cards
  const cardVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <section className="container py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-dark dark:text-light mb-8"
      >
        Skills & Technologies
      </motion.h2>
      {Object.keys(categories).length === 0 ? (
        <p className="text-dark/70 dark:text-light/70">No skills available.</p>
      ) : (
        Object.keys(categories).map((category, catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold text-primary dark:text-[#06B6D4] mb-6">
              {category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories[category].map((skill, i) => (
                <motion.div
                  key={skill._id}
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white dark:bg-[#1F2937] rounded-xl2 p-6 shadow-soft hover:shadow-lg transition flex flex-col items-center text-center"
                >
                  <div className="mb-4">{renderIcon(skill.icon, skill.name)}</div>
                  <p className="font-medium text-dark dark:text-light mb-2">{skill.name}</p>
                  <p className="text-sm text-accent dark:text-[#06B6D4] mb-2">{skill.level}</p>
                  <p className="text-sm text-dark/70 dark:text-light/70">{skill.usage}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))
      )}
    </section>
  );
};

export default Skills;