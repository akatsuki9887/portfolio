import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="bg-white dark:bg-[#1F2937] rounded-xl2 shadow-soft overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300"
  >
    <div className="aspect-[16/9] overflow-hidden">
      <motion.img
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        src={project.screenshot || '/project-cover.jpg'}
        alt={`Screenshot of ${project.title}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="p-5">
      <h3 className="text-xl font-semibold text-dark dark:text-light leading-tight">{project.title}</h3>
      <p className="text-sm text-dark/70 dark:text-light/70 mt-2 leading-relaxed">
        {project.description} {project.outcome && <span>(Outcome: {project.outcome})</span>}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech?.map((tech, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="bg-light dark:bg-[#1F2937] text-dark dark:text-light px-2 py-1 rounded-full text-sm font-medium border border-dark/10 dark:border-light/10"
          >
            {tech}
          </motion.span>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        {project.githubLink && (
          <motion.a
            whileHover={{ scale: 1.1 }}
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-[#06B6D4]/40"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <FaGithub /> Code
          </motion.a>
        )}
        {project.liveLink && (
          <motion.a
            whileHover={{ scale: 1.1 }}
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary dark:text-[#06B6D4] hover:text-accent dark:hover:text-[#0891B2] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-[#06B6D4]/40"
            aria-label={`View live demo of ${project.title}`}
          >
            <FaExternalLinkAlt /> Live
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://portfolio-backend-82ts.onrender.com/api/projects')
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load projects');
        setLoading(false);
        console.error('Error fetching projects:', err);
      });
  }, []);

  // Get unique tech stacks for filter
  const techStacks = ['All', ...new Set(projects.flatMap((project) => project.tech || []))];

  // Filter projects based on selected tech
  const filteredProjects = filter === 'All' ? projects : projects.filter((project) => project.tech?.includes(filter));

  return (
    <section className="container py-18">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-dark dark:text-light mb-8 leading-tight"
      >
        Projects
      </motion.h2>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {techStacks.map((tech, index) => (
          <motion.button
            key={tech}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(tech)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === tech
                ? 'bg-primary dark:bg-[#1E40AF] text-white'
                : 'bg-light dark:bg-[#1F2937] text-dark dark:text-light border border-dark/10 dark:border-light/10'
            }`}
            aria-pressed={filter === tech}
          >
            {tech}
          </motion.button>
        ))}
      </div>
      {loading ? (
        <p className="text-dark/70 dark:text-light/70 text-lg">Loading projects...</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-400 text-lg">{error}</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-dark/70 dark:text-light/70 text-lg">No projects available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;