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
import { usePublications } from '../hooks/usePublications.js';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Portfolio = () => {
  const [selected, setSelected] = useState(null);
  const { classes, loading: classesLoading } = useProjectClasses();
  const { publications, loading: pubsLoading } = usePublications();

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
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[250px] mt-12 px-5">
                  {cls.projects.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={{ ...project, class: cls }}
                      onClick={setSelected}
                      className={
                        cls.projects.length === 1
                          ? 'md:col-span-2 h-64'
                          : i === 0 && cls.projects.length >= 3
                          ? 'md:col-span-2'
                          : ''
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 mt-8">No projects yet.</p>
              )}
            </motion.section>
          ))
        )}

        {/* Publications */}
        {!pubsLoading && publications.length > 0 && (
          <motion.section
            className="font-lexend_exa mb-20 text-[#383838]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={sectionVariants}
          >
            <MarqueeSection text="PUBLICATIONS" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[250px] mt-12 px-5">
              {publications.map((pub, i) => (
                <div
                  key={pub.id}
                  className={`relative rounded-lg shadow-md overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 cursor-pointer
                    ${i === 0 && publications.length >= 2 ? 'md:row-span-2' : ''}`}
                  onClick={() =>
                    setSelected({
                      ...pub,
                      description: pub.summary,
                      techStack: pub.coAuthors,
                      link: pub.link,
                      class: { name: 'Publication' },
                    })
                  }
                >
                  {pub.imageUrl && (
                    <img
                      src={pub.imageUrl}
                      alt={pub.title}
                      className="w-full h-full object-cover opacity-40"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <h3 className="text-lg font-bold line-clamp-3">{pub.title}</h3>
                    <p className="text-sm mt-2 opacity-80 line-clamp-3">{pub.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  );
};

export default Portfolio;
