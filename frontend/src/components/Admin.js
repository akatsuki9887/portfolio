import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [project, setProject] = useState({ title: '', description: '', githubLink: '', liveLink: '' });
  const [skill, setSkill] = useState({ name: '', icon: '' });

  // Handle Project Submission
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://portfolio-backend-82ts.onrender.com/api/projects', project);
      alert('Project added!');
      setProject({ title: '', description: '', githubLink: '', liveLink: '' }); // Reset form
    } catch (error) {
      alert('Error adding project');
    }
  };

  // Handle Skill Submission
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://portfolio-backend-82ts.onrender.com/api/skills', skill);
      alert('Skill added!');
      setSkill({ name: '', icon: '' }); // Reset form
    } catch (error) {
      alert('Error adding skill');
    }
  };

  return (
    <section className="p-10">
      <h2 className="text-3xl mb-4">Admin Panel</h2>

      {/* Add Project Form */}
      <div className="mb-8">
        <h3 className="text-2xl mb-2">Add Project</h3>
        <form onSubmit={handleProjectSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            className="border p-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={project.githubLink}
            onChange={(e) => setProject({ ...project, githubLink: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Live Link"
            value={project.liveLink}
            onChange={(e) => setProject({ ...project, liveLink: e.target.value })}
            className="border p-2 w-full"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Project</button>
        </form>
      </div>

      {/* Add Skill Form */}
      <div>
        <h3 className="text-2xl mb-2">Add Skill</h3>
        <form onSubmit={handleSkillSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Skill Name"
            value={skill.name}
            onChange={(e) => setSkill({ ...skill, name: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Icon Name (e.g., FaReact)"
            value={skill.icon}
            onChange={(e) => setSkill({ ...skill, icon: e.target.value })}
            className="border p-2 w-full"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Skill</button>
        </form>
      </div>
    </section>
  );
};

export default Admin;