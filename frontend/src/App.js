import React, { useState, createContext } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import ErrorBoundary from './components/ErrorBoundary';

export const ThemeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  React.useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ErrorBoundary>
        <div className={`${darkMode ? 'dark bg-dark text-light' : 'bg-light text-dark'} min-h-screen flex flex-col transition-smooth`}>
          <Navbar />
          <main className="flex-grow">
            <section id="hero" className="py-18">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <Hero />
              </motion.div>
            </section>
            <section id="about" className="py-18">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <About />
              </motion.div>
            </section>
            <section id="skills" className="py-18">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <Skills />
              </motion.div>
            </section>
            <section id="projects" className="py-18">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <Projects />
              </motion.div>
            </section>
            <section id="contact" className="py-18">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <Contact />
              </motion.div>
            </section>
            <section id="admin" className="py-18 hidden">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
              >
                <Admin />
              </motion.div>
            </section>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}

export default App;