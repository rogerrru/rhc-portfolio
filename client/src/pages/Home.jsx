import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import ProjectCard from '../components/shared/ProjectCard.jsx';
import ProjectModal from '../components/shared/ProjectModal.jsx';
import SEOHead from '../components/shared/SEOHead.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';
import { useProjects } from '../hooks/useProjects.js';
import portrait from '../assets/home/rectangle-1.png';

const HERO_TITLE = 'ASPIRING COMPUTER SCIENCE PROFESSIONAL';
const HERO_DESC = "My name's Roger Jr. H. Chegyem. I'm a Computer Science professional from Baguio City with experience in web development, data science, and machine learning. Glad you're here. Feel free to look through my projects and work — always open to learning, building, and collaborating. Cheers!";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: 'easeOut' } }),
};

const Home = () => {
  const [selected, setSelected] = useState(null);
  const { projects, loading } = useProjects({ featured: true });

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        description="Roger Jr. H. Chegyem — Full-Stack Developer, Data Analyst, and Machine Learning Engineer."
        url="https://rogerrru.github.io/rhc-portfolio/"
      />
      <Header />

      <main className="flex-1 px-5 py-10">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <motion.h2
            className="text-center text-4xl sm:text-5xl md:text-6xl font-lexend_exa font-black mb-10"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            HELLO!
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              src={portrait}
              alt="Roger Chegyem portrait"
              className="w-full max-w-sm rounded-lg shadow-md mx-auto"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.2}
            >
              <h3 className="text-base sm:text-xl font-lexend_exa font-black mb-4">{HERO_TITLE}</h3>
              <p className="font-lexend_exa text-sm sm:text-base text-gray-700 mb-6 leading-relaxed text-justify">
                {HERO_DESC}
              </p>
              <Link
                to="/resume"
                className="font-lexend_exa inline-block bg-black text-white font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                RESUME
              </Link>
            </motion.div>
          </div>

          <hr className="mt-16 border-t border-gray-300" />
        </section>

        {/* Projects */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-4xl font-lexend_exa font-black">PROJECTS</h2>
            <Link
              to="/portfolio"
              className="font-lexend_exa inline-block bg-black text-white font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition text-sm"
            >
              VIEW ALL →
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20"><LoadingSpinner /></div>
          ) : (
            <motion.div
              className="flex flex-wrap justify-center gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.2}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full max-w-sm sm:w-[calc(50%-10px)] sm:max-w-none lg:w-[calc(33.333%-14px)]">
                  <ProjectCard
                    project={{ ...project, _type: 'project' }}
                    onClick={setSelected}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </section>
      </main>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  );
};

export default Home;
