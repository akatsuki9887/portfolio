import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('https://portfolio-backend-82ts.onrender.com/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  return (
    <section className="p-10">
      <h2 className="text-3xl mb-4">Projects</h2>
      <div className="grid grid-cols-2 gap-4">
        {projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          projects.map(project => (
            <div key={project._id} className="bg-white p-4 shadow">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="ml-4">Live</a>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;