import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import ProjectCard from '../components/shared/ProjectCard.jsx';
import ProjectModal from '../components/shared/ProjectModal.jsx';
import MarqueeSection from '../components/shared/MarqueeSection.jsx';
import SEOHead from '../components/shared/SEOHead.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';
import { useProjectClasses } from '../hooks/useProjects.js';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Portfolio = () => {
  const [selected, setSelected] = useState(null);
  const { classes, loading: classesLoading } = useProjectClasses();

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Portfolio"
        description="Projects and publications by Roger Chegyem — Full-Stack Web, Machine Learning, Software Engineering."
      />
      <Header />

      <main className="flex-1 bg-white py-10">
        <motion.h2
          className="font-lexend_exa text-2xl md:text-3xl font-extrabold text-[#383838] text-center max-w-4xl mx-auto px-5 md:px-40 my-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          HERE ARE SOME PROJECTS THAT I&apos;VE WORKED ON. TAKE A LOOK AROUND.
        </motion.h2>

        {classesLoading ? (
          <div className="flex justify-center py-20"><LoadingSpinner /></div>
        ) : (
          classes.map((cls) => (
            <motion.section
              key={cls.id}
              className="font-lexend_exa mb-20 text-[#383838]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={sectionVariants}
            >
              <MarqueeSection text={cls.name.toUpperCase()} />

              {cls.projects?.length > 0 ? (
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 px-5">
                  {cls.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={{ ...project, class: cls, _type: 'project' }}
                      onClick={setSelected}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 mt-8">No projects yet.</p>
              )}
            </motion.section>
          ))
        )}


      </main>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  );
};

export default Portfolio;
