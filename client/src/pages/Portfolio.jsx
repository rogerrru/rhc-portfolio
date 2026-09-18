import React, { useMemo, useState } from 'react';
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

// Projects have no date of their own, so "recent" means when the project was added.
// Array#sort is stable, so ties keep the curated order set in the admin.
const SORT_OPTIONS = [
  { value: 'default', label: 'Default', compare: null },
  { value: 'featured', label: 'Featured', compare: (a, b) => Number(b.featured) - Number(a.featured) },
  { value: 'recent', label: 'Recently added', compare: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
  {
    value: 'title',
    label: 'A–Z',
    compare: (a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base', numeric: true }),
  },
];

const Portfolio = () => {
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const { classes, loading: classesLoading } = useProjectClasses();

  // Sorting only reorders projects inside each section; section order stays admin-controlled.
  const sortedClasses = useMemo(() => {
    const { compare } = SORT_OPTIONS.find((o) => o.value === sortBy);
    if (!compare) return classes;
    return classes.map((cls) => ({ ...cls, projects: [...(cls.projects ?? [])].sort(compare) }));
  }, [classes, sortBy]);

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
          <>
            <div
              className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-5 mb-14"
              role="group"
              aria-label="Sort projects"
            >
              <span className="font-lexend_exa text-[10px] tracking-[0.2em] uppercase text-gray-400 mr-1">
                Sort by
              </span>
              {SORT_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSortBy(value)}
                  aria-pressed={sortBy === value}
                  className={`font-lexend_exa text-[11px] tracking-wide uppercase px-3 py-1.5 rounded-full transition-colors ${
                    sortBy === value ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {sortedClasses.map((cls) => (
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
                  <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 mt-12 px-5">
                    <div className="mb-5 break-inside-avoid">
                      <span className="inline-block font-lexend_exa text-[10px] tracking-[0.2em] uppercase text-white bg-black px-2 py-1 rounded-full mb-3">
                        {cls.name}
                      </span>
                      <p className="font-lexend_exa text-xl sm:text-2xl font-bold leading-snug">
                        {cls.description || `${cls.projects.length} project${cls.projects.length === 1 ? '' : 's'} in ${cls.name}`}
                      </p>
                    </div>

                    {cls.projects.map((project) => (
                      <div key={project.id} className="mb-5 break-inside-avoid">
                        <ProjectCard
                          project={{ ...project, class: cls, _type: 'project' }}
                          onClick={setSelected}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 mt-8">No projects yet.</p>
                )}
              </motion.section>
            ))}
          </>
        )}


      </main>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </div>
  );
};

export default Portfolio;
