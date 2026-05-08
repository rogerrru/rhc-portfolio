import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import SEOHead from '../components/shared/SEOHead.jsx';
import { useSiteSettings } from '../hooks/useSiteSettings.js';
import { useCertifications } from '../hooks/useCertifications.js';

const Resume = () => {
  const { settings } = useSiteSettings();
  const { certifications } = useCertifications();
  const [modalOpen, setModalOpen] = useState(false);

  const introText = settings.resume_intro || '';
  const resumeUrl = settings.resume_url || '';

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Resume"
        description="Resume and certifications of Roger Jr. H. Chegyem — CS professional with expertise in full-stack development, data analysis, and machine learning."
      />
      <Header />

      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <section className="justify-center w-full max-w-7xl bg-white md:py-16 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left */}
          <motion.div
            className="flex flex-col h-full rounded-2xl w-full lg:h-[800px] overflow-hidden justify-center items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Intro */}
            <div>
              <h1 className="font-lexend_exa text-6xl font-black text-[#383838] mb-4">
                HEY THERE!
              </h1>
              <p className="text-justify text-lg font-serif leading-relaxed text-black mb-10">
                {introText}
              </p>
            </div>

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="flex flex-col flex-1 w-full">
                <h2 className="font-lexend_exa text-2xl text-center md:text-left md:text-3xl font-black text-[#383838] mb-6">
                  CERTIFICATIONS
                </h2>
                <div className="flex-1 overflow-y-scroll pr-2 space-y-4 max-h-[400px]">
                  {[...certifications]
                    .sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt))
                    .map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center justify-between bg-gray-200 rounded-xl px-5 py-4 shadow-sm flex-shrink-0 gap-4"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="font-lexend_exa font-medium text-gray-800 leading-snug">
                            {cert.name}
                          </span>
                          <span className="font-lexend_exa text-sm text-gray-600 mt-0.5">
                            {cert.organization}
                          </span>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="font-lexend_exa text-sm text-gray-600">
                              Completion Date:{' '}
                              {new Date(cert.issuedAt).toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                              })}
                            </span>
                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-lexend_exa text-xs underline text-gray-500 hover:text-black"
                              >
                                View credential
                              </a>
                            )}
                          </div>
                        </div>
                        {cert.badgeUrl && (
                          <img
                            src={cert.badgeUrl}
                            alt={cert.organization}
                            className="w-10 h-10 object-contain rounded-md shrink-0"
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right — clickable resume image */}
          <motion.div
            className="rounded-2xl w-full lg:h-[800px] cursor-pointer flex justify-center items-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onClick={() => resumeUrl && setModalOpen(true)}
          >
            {resumeUrl ? (
              <img
                src={resumeUrl}
                alt="Resume"
                className="max-h-[800px] w-auto object-contain"
              />
            ) : (
              <div className="bg-gray-100 rounded-2xl w-full h-full flex items-center justify-center text-gray-400 font-lexend_exa text-sm">
                Resume coming soon
              </div>
            )}
          </motion.div>
        </section>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div
          className="font-lexend_exa fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
          onClick={() => setModalOpen(false)}
        >
          <button
            onClick={() => setModalOpen(false)}
            className="cursor-pointer absolute top-6 right-6 bg-white rounded-full px-4 py-2 text-black font-bold shadow-lg hover:bg-gray-200"
          >
            ✕
          </button>
          <div
            className="relative max-w-4xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={resumeUrl}
              alt="Resume"
              className="w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Resume;
