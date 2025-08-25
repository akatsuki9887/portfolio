import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Icons from 'react-icons/fa'; // Import all Fa icons

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/skills') // Update to Render URL
      .then(res => setSkills(res.data))
      .catch(err => console.error('Error fetching skills:', err));
  }, []);

  // Dynamically render icon based on icon name
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={50} /> : null;
  };

  return (
    <section className="p-10">
      <h2 className="text-3xl mb-4">Skills & Technologies</h2>
      <div className="grid grid-cols-3 gap-4">
        {skills.length === 0 ? (
          <p>No skills available.</p>
        ) : (
          skills.map(skill => (
            <div key={skill._id} className="text-center">
              {renderIcon(skill.icon)}
              <p>{skill.name}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Skills;