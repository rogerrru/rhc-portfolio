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

      <main className="flex-1 flex items-center justify-center px-5 py-10 pb-10">
        <section className="w-full max-w-7xl bg-white py-16 px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-justify text-lg font-lancelot leading-relaxed text-black">
              {introText}
            </p>

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h3 className="font-lexend_exa font-black text-xl mb-4">CERTIFICATIONS</h3>
                <ul className="space-y-3">
                  {certifications.map((cert) => (
                    <li key={cert.id} className="flex items-start gap-3">
                      {cert.badgeUrl && (
                        <img
                          src={cert.badgeUrl}
                          alt={cert.organization}
                          className="w-10 h-10 object-contain rounded"
                        />
                      )}
                      <div>
                        <p className="font-lexend_exa font-semibold text-sm">{cert.name}</p>
                        <p className="text-xs text-gray-500">
                          {cert.organization} &mdash;{' '}
                          {new Date(cert.issuedAt).getFullYear()}
                        </p>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline text-gray-600 hover:text-black"
                          >
                            View credential
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
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
                    className="w-full h-[800px] rounded-xl border border-gray-200 shadow"
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
