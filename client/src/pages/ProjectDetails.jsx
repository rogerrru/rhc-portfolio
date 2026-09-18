import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import SEOHead from '../components/shared/SEOHead.jsx';
import LoadingSpinner from '../components/shared/LoadingSpinner.jsx';
import BackToTop from '../components/shared/BackToTop.jsx';
import ProjectLinks from '../components/shared/ProjectLinks.jsx';
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
  const [lightbox, setLightbox] = useState(null); // index of open screenshot within the active device set
  const [device, setDevice] = useState('desktop'); // which screenshot set is showing

  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Screenshots come in two device sets; the toggle only shows when a project has both.
  const deviceSets = [
    { key: 'desktop', label: 'Desktop', shots: item?.screenshots ?? [] },
    { key: 'mobile', label: 'Mobile', shots: item?.mobileScreenshots ?? [] },
  ].filter((d) => d.shots.length > 0);
  const activeSet = deviceSets.find((d) => d.key === device) ?? deviceSets[0];
  const activeShots = activeSet?.shots ?? [];
  const shotCount = activeShots.length;
  const lightboxOpen = lightbox !== null;

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + shotCount) % shotCount);
      else if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % shotCount);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, shotCount, closeLightbox]);

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
  const hasLinks = item.link || item.githubRepo;
  const linkLabel = item._type === 'publication' ? 'View Publication' : 'Live Project';

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
              className={`w-full h-72 object-cover rounded-lg shadow ${hasLinks ? 'mb-4' : 'mb-8'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* External links — sit right under the hero image, same pills as the summary modal */}
          {hasLinks && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <ProjectLinks link={item.link} githubRepo={item.githubRepo} linkLabel={linkLabel} />
            </div>
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

          {/* Screenshots */}
          {deviceSets.length > 0 && (
            <Section title="Screenshots">
              {deviceSets.length > 1 && (
                <div role="group" aria-label="Screenshot device" className="inline-flex gap-1 p-1 mb-4 bg-gray-100 rounded-full">
                  {deviceSets.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setDevice(key)}
                      aria-pressed={activeSet.key === key}
                      className={`font-lexend_exa text-xs font-bold px-4 py-1.5 rounded-full transition-colors ${
                        activeSet.key === key ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {activeSet.key === 'mobile' ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {activeShots.map((url, idx) => (
                    <button
                      key={url}
                      onClick={() => setLightbox(idx)}
                      className="overflow-hidden rounded-2xl border-[3px] border-gray-900 bg-gray-900 aspect-[9/19] focus:outline-none"
                    >
                      <img src={url} alt={`Mobile screenshot ${idx + 1}`} className="w-full h-full object-cover object-top hover:scale-105 transition duration-300" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeShots.map((url, idx) => (
                    <button
                      key={url}
                      onClick={() => setLightbox(idx)}
                      className="overflow-hidden rounded-lg border border-gray-200 hover:border-gray-400 transition focus:outline-none"
                    >
                      <img src={url} alt={`Screenshot ${idx + 1}`} className="w-full h-36 object-cover hover:scale-105 transition duration-300" />
                    </button>
                  ))}
                </div>
              )}
            </Section>
          )}
        </div>
      </main>

      {lightboxOpen && shotCount > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} aria-label="Close" className="absolute top-5 right-6 text-white text-2xl leading-none hover:text-gray-300">✕</button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + shotCount) % shotCount); }}
            aria-label="Previous screenshot"
            className="absolute left-4 text-white text-3xl leading-none hover:text-gray-300 px-2"
          >‹</button>
          <img
            src={activeShots[lightbox]}
            alt={`${activeSet.label} screenshot ${lightbox + 1}`}
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % shotCount); }}
            aria-label="Next screenshot"
            className="absolute right-4 text-white text-3xl leading-none hover:text-gray-300 px-2"
          >›</button>
          <span className="absolute bottom-5 text-white/60 text-sm font-lexend_exa">
            {deviceSets.length > 1 && `${activeSet.label} · `}{lightbox + 1} / {shotCount}
          </span>
        </div>
      )}

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProjectDetails;
