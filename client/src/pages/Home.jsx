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
import { useSiteSettings } from '../hooks/useSiteSettings.js';
import portrait from '../assets/home/rectangle-1.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: 'easeOut' } }),
};

const Home = () => {
  const [selected, setSelected] = useState(null);
  const { projects, loading } = useProjects({ featured: true });
  const { settings } = useSiteSettings();

  const heroTitle = settings.home_hero_title || 'ASPIRING COMPUTER SCIENCE PROFESSIONAL';
  const heroDesc = settings.home_hero_description || '';
  const projectsDesc = settings.home_projects_description || '';

  const featured = projects.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        description={settings.meta_description}
        url="https://rogerrru.github.io/rhc-portfolio/"
      />
      <Header />

      <main className="flex-1 px-5 py-10">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <motion.h2
            className="text-center text-6xl font-lexend_exa font-black mb-10"
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
              <h3 className="text-xl font-lexend_exa font-black mb-4">{heroTitle}</h3>
              <p className="font-lancelot text-xl text-gray-700 mb-6 leading-relaxed text-justify">
                {heroDesc}
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
          <motion.h2
            className="text-4xl font-lexend_exa font-black mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            PROJECTS
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.1}
            >
              <p className="font-lancelot text-xl text-gray-700 mb-6 leading-relaxed text-justify">
                {projectsDesc}
              </p>
              <Link
                to="/portfolio"
                className="font-lexend_exa inline-block bg-black text-white font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                PORTFOLIO
              </Link>

              {loading ? (
                <div className="mt-6 h-96 flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : featured[0] ? (
                <ProjectCard
                  project={featured[0]}
                  onClick={setSelected}
                  className="mt-6 h-96"
                />
              ) : null}
            </motion.div>

            {/* Right grid */}
            {!loading && featured.length > 1 && (
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-[300px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0.2}
              >
                {featured.slice(1).map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={setSelected}
                    className={i === 0 ? 'row-span-2' : ''}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  );
};

export default Home;
