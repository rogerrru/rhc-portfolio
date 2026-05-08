import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import SEOHead from '../components/shared/SEOHead.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';
import BackToTop from '../components/shared/BackToTop.jsx';
import { fetchProjects, fetchPublications } from '../api/index.js';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Section = ({ title, children }) => (
  <motion.section
    className="mb-10"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <h2 className="font-lexend_exa text-xl font-semibold mb-3 border-b border-gray-200 pb-2">
      {title}
    </h2>
    {children}
  </motion.section>
);

const BulletList = ({ items }) => (
  <ul className="list-disc ml-5 sm:ml-6 text-gray-600 space-y-2 font-lexend_exa text-sm sm:text-base leading-relaxed">
    {items.map((pt, i) => <li key={i}>{pt}</li>)}
  </ul>
);

const ProjectDetails = () => {
  const { type, id } = useParams(); // type = 'project' | 'publication'
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        if (type === 'project') {
          const all = await fetchProjects();
          const found = all.find((p) => p.id === parseInt(id));
          if (!found) throw new Error('Project not found');
          setItem({ ...found, _type: 'project' });
        } else {
          const all = await fetchPublications();
          const found = all.find((p) => p.id === parseInt(id));
          if (!found) throw new Error('Publication not found');
          setItem({ ...found, _type: 'publication', description: found.summary });
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [type, id]);

  if (loading) return <div className="flex flex-col min-h-screen"><Header /><div className="flex-1 flex items-center justify-center"><LoadingSpinner /></div><Footer /></div>;

  if (error || !item) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center font-lexend_exa">
            <h2 className="text-2xl font-bold mb-4">Not found</h2>
            <Link to="/portfolio" className="underline hover:text-gray-500">← Back to Portfolio</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isSolo = item.team === '1' || item.team === null;
  // Skills: prefer dedicated skills array, fall back to techStack
  const skillsList = item.skills?.length ? item.skills : (item.techStack ?? []);
  // Authors: for publications use coAuthors
  const teamLabel = item._type === 'publication'
    ? (item.coAuthors?.length ? item.coAuthors.join(', ') : 'Roger Jr. Chegyem')
    : (isSolo ? 'Roger Jr. Chegyem' : item.team);

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead title={item.title} description={item.description} image={item.imageUrl} />
      <Header />

      <main className="flex-1 bg-white py-6 sm:py-10">
        <div className="font-lexend_exa max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <Link to="/portfolio" className="text-gray-500 hover:text-black transition text-sm mb-6 inline-block">
            ← Back to Portfolio
          </Link>

          {/* Title */}
          <motion.h1
            className="text-xl sm:text-3xl font-bold mb-6 leading-snug"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {item.title}
          </motion.h1>

          {/* Hero image */}
          {item.imageUrl && (
            <motion.img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-72 object-cover rounded-lg shadow mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* About */}
          {(item.about || item.description) && (
            <Section title="About">
              <p className="font-lexend_exa text-sm sm:text-base text-gray-700 leading-relaxed">
                {item.about || item.description}
              </p>
            </Section>
          )}

          {/* What We Did */}
          {item.whatWeDid && (
            <Section title="What We Did">
              <p className="font-lexend_exa text-sm sm:text-base text-gray-600 leading-relaxed">{item.whatWeDid}</p>
            </Section>
          )}

          {/* Takeaways */}
          {item.takeaways?.length > 0 && (
            <Section title="Takeaways">
              <BulletList items={item.takeaways} />
            </Section>
          )}

          {/* Quick Info */}
          <Section title="Quick Info">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-gray-700 font-lexend_exa text-sm sm:text-base">
              <p>
                <span className="font-lexend_exa font-semibold text-sm">
                  {isSolo && item._type === 'project' ? 'Author' : item._type === 'publication' ? 'Authors' : 'Team'}:
                </span>{' '}
                {teamLabel}
              </p>
              {item.duration && (
                <p>
                  <span className="font-lexend_exa font-semibold text-sm">Duration:</span>{' '}
                  {item.duration}
                </p>
              )}
              <p>
                <span className="font-lexend_exa font-semibold text-sm">Category:</span>{' '}
                {item._type === 'publication' ? 'Publication' : (item.class?.name ?? '—')}
              </p>
            </div>
          </Section>

          {/* Skills / Focus */}
          {skillsList.length > 0 && (
            <Section title="Skills | Focus">
              <div className="flex flex-wrap gap-2">
                {skillsList.map((s, i) => (
                  <span key={i} className="px-3 py-1 border border-gray-400 rounded-full text-sm font-lexend_exa">
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Highlights */}
          {item.highlights?.length > 0 && (
            <Section title="Highlights">
              <BulletList items={item.highlights} />
            </Section>
          )}

          {/* External links */}
          {(item.link || item.githubRepo) && (
            <div className="flex gap-6 mt-10 pt-6 border-t border-gray-200">
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer"
                  className="font-lexend_exa font-semibold underline hover:text-gray-500 text-sm">
                  View Project →
                </a>
              )}
              {item.githubRepo && (
                <a href={item.githubRepo} target="_blank" rel="noopener noreferrer"
                  className="font-lexend_exa font-semibold underline hover:text-gray-500 text-sm">
                  GitHub →
                </a>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProjectDetails;
