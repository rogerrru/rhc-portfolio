import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import SEOHead from '../components/shared/SEOHead.jsx';
import { useSiteSettings } from '../hooks/useSiteSettings.js';
import { useCertifications } from '../hooks/useCertifications.js';

const Resume = () => {
  const { settings } = useSiteSettings();
  const { certifications } = useCertifications();

  const introText = settings.resume_intro || '';
  const resumeUrl = settings.resume_url || '';

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Resume"
        description="Resume and certifications of Roger Jr. H. Chegyem — CS professional with expertise in full-stack development, data analysis, and machine learning."
      />
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-10">
        <section className="w-full max-w-7xl bg-white py-8 md:py-16 px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-lexend_exa text-4xl sm:text-5xl md:text-6xl font-black text-[#383838]">
              HEY THERE!
            </h1>
            <p className="text-justify text-sm sm:text-base font-sans leading-relaxed text-black">
              {introText}
            </p>

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="flex flex-col">
                <h2 className="font-lexend_exa text-2xl font-black text-[#383838] mb-4">
                  CERTIFICATIONS
                </h2>
                <div className="overflow-y-auto space-y-3 max-h-[420px] pr-1">
                  {[...certifications]
                    .sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt))
                    .map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center justify-between bg-gray-200 rounded-xl px-5 py-4 shadow-sm gap-4"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="font-lexend_exa font-semibold text-sm text-gray-800 leading-snug">
                            {cert.name}
                          </span>
                          <span className="font-lexend_exa text-xs text-gray-600 mt-0.5">
                            {cert.organization}
                          </span>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="font-lexend_exa text-xs text-gray-500">
                              {new Date(cert.issuedAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
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

          {/* Right — Resume image / PDF */}
          <motion.div
            className="rounded-2xl w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {resumeUrl ? (
              resumeUrl.endsWith('.pdf') ? (
                <div className="space-y-4">
                  <iframe
                    src={resumeUrl}
                    title="Resume PDF"
                    className="w-full h-[60vh] sm:h-[700px] md:h-[800px] rounded-xl border border-gray-200 shadow"
                  />
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-lexend_exa inline-block bg-black text-white font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition"
                    download
                  >
                    DOWNLOAD PDF
                  </a>
                </div>
              ) : (
                <img
                  src={resumeUrl}
                  alt="Resume"
                  className="w-full rounded-xl shadow"
                />
              )
            ) : (
              <div className="bg-gray-100 rounded-2xl w-full h-[600px] flex items-center justify-center text-gray-400 font-lexend_exa text-sm">
                Resume coming soon
              </div>
            )}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
